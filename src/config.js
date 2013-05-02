
var SoundEditor = function (sound) 
{
	this.sound = sound;
	//UI
	this.checkbox = null;
	this.nameEdit = null;
	this.saveNameButton = null;
	this.renameCancelButton = null;
	this.playButton = null;
	this.renameButton = null;
	this.deleteButton = null;
	this.nameLabel = null;
	this.editSection = null;
};
// Create UI elements
SoundEditor.prototype.getLiElement = function ()
{
	var li = document.createElement("LI");
	li.appendChild(this.getCheckbox());
	li.appendChild(this.getNameSection());
	if (!this.sound.isBuiltIn)
		li.appendChild(this.getButtonSection());
	return li;
};
SoundEditor.prototype.getButtonSection = function ()
{
	var div = document.createElement("DIV");
	div.className = "buttonSection section"
	div.appendChild(this.getRenameButton());
	div.appendChild(this.getDeleteButton());
	return div;
};
SoundEditor.prototype.getCheckbox = function ()
{
	var div = document.createElement("DIV");
	div.className = "checkSection section";
	var checkbox = document.createElement("INPUT");
	checkbox.type = "checkbox";
	checkbox.checked = this.sound.enabled;
	this.checkbox = checkbox;
	this.checkbox.onclick = this.getToggleEnabledAction();
	div.appendChild(checkbox);
	div.appendChild(this.getPlayButton());
	return div;
};
SoundEditor.prototype.getNameSection = function ()
{
	var div = document.createElement("DIV");
	div.className = "nameSection section";
	var nameLabel = document.createElement("DIV");
	nameLabel.innerHTML = this.sound.name;
	this.nameLabel = nameLabel;
	
	var editSection = document.createElement("DIV");
	this.editSection = editSection;
	editSection.style.display = "none";
	var nameEdit = document.createElement("INPUT");
	this.nameEdit = nameEdit;
	nameEdit.value = this.sound.name;
	
	var saveNameButton = document.createElement("INPUT");
	saveNameButton.type = "BUTTON";
	saveNameButton.value = "OK";
	saveNameButton.onclick = this.getSaveNameAction();
	this.saveNameButton = saveNameButton;
	
	var renameCancelButton = document.createElement("INPUT");
	renameCancelButton.type = "BUTTON";
	renameCancelButton.value = "CANCEL";
	renameCancelButton.onclick = this.getRenameCancelAction();
	this.renameCancelButton = renameCancelButton;
	
	editSection.appendChild(nameEdit);
	editSection.appendChild(saveNameButton);
	editSection.appendChild(renameCancelButton);
	
	div.appendChild(nameLabel);
	div.appendChild(editSection);
	
	return div;
};
SoundEditor.prototype.getPlayButton = function ()
{
	var a = document.createElement("A");
	var icon = document.createElement("IMG");
	icon.src = "../img/icon_play.png";
	a.appendChild(icon);
	a.href = "#";
	a.onclick = this.getPlayAction();
	return a;
};
SoundEditor.prototype.getRenameButton = function ()
{
	var a = document.createElement("A");
	var icon = document.createElement("IMG");
	icon.src = "../img/icon_edit.png";
	a.appendChild(icon);
	a.href = "#";
	a.onclick = this.getRenameAction();
	return a;
};

SoundEditor.prototype.getDeleteButton = function ()
{
	var a = document.createElement("A");
	var icon = document.createElement("IMG");
	icon.src = "../img/icon_delete.png";
	a.appendChild(icon);
	a.href = "#";
	a.onclick = this.getDeleteAction();
	return a;
};

// Actions

SoundEditor.prototype.getToggleEnabledAction = function ()
{
	var self = this;
	return function (event)
	{
		self.sound.enabled = self.checkbox.checked;
		SoundEffect.saveAll();
	}
};

SoundEditor.prototype.getPlayAction = function ()
{
	var self = this;
	return function (event)
	{
		self.sound.play();
	}
};
SoundEditor.prototype.getRenameAction = function ()
{
	var self = this;
	return function (event)
	{
		self.nameLabel.style.display = 'none';
		self.editSection.style.display = 'block';
		self.nameEdit.focus();
	} 
};
SoundEditor.prototype.getSaveNameAction = function ()
{
	var self = this;
	return function (event)
	{
		if (self.nameEdit.value.length<1)
		{
			alert("何か入れてください。");
			return;
		}
		if (self.nameEdit.value.length>NAME_LENGTH_LIMIT)
		{
			alert("長すぎます。" + NAME_LENGTH_LIMIT + "文字以下にしてください。");
			return;
		}
		self.sound.name = self.nameEdit.value
		SoundEffect.saveAll();
		self.nameLabel.innerHTML = self.sound.name;
		self.nameLabel.style.display = 'block';
		self.editSection.style.display = 'none';
	}
};

SoundEditor.prototype.getRenameCancelAction = function ()
{
	var self = this;
	return function (event)
	{
		self.nameEdit.value = self.sound.name;
		self.nameLabel.style.display = 'block';
		self.editSection.style.display = 'none';
	}
};
SoundEditor.prototype.getDeleteAction = function ()
{
	var self = this;
	return function (event)
	{
		if (window.confirm("本当に削除してよろしいですか?")) 
		{
			deleteFile(self.sound);
		}
	}
};

function deleteFile (sound)
{
	var fileName = sound.fileName;
	webkitRequestFileSystem(PERSISTENT, 1024*1024, function(fileSystem)
	{
		fileSystem.root.getDirectory(AUDIO_DATA_DIR, {create:true}, function(directory)
		{
			directory.getFile(fileName, {create:true}, function(fileEntry)
			{
				console.log(fileEntry.toURL());
				fileEntry.remove(function()
				{
					alert("削除しました");
					readSoundDirectory(renderListAndSave);
				}, 
				onFileError);
			}, 
			onFileError);
		},
		onFileError);
	});
};

function renderList (soundEffects)
{	
	document.getElementById("audio_list").innerHTML = '';
	SoundEffect.list = soundEffects;
	for (var i=0; i<soundEffects.length; i++)
	{
		var soundEditor = new SoundEditor(soundEffects[i]);
		document.getElementById("audio_list").appendChild(soundEditor.getLiElement());
	}
}
var REGEX_FILE_TYPE_AUDIO = new RegExp("audio\\/.*");
var SIZE_LIMIT = 1024 * 1024;
var NAME_LENGTH_LIMIT = 30;
function readFile (event)
{
	var file = event.target.files[0];
	console.log("File Type: " + file);
	for (var key in file)
	{
		console.log(key + "=" + file[key]);
	}
	var isAudioFile = file.type && file.type.match(REGEX_FILE_TYPE_AUDIO);
	if (!isAudioFile)
	{
		alert("音声ファイルではないようです。");
	}
	else if (file.size > SIZE_LIMIT)
	{
		alert("ファイルサイズが大きすぎます。1MB未満のファイルにしてください。");
	}
	else
	{
		var reader = new FileReader();
		reader.onload = getOnReadCallback (file.name, file.type);
		reader.readAsArrayBuffer(file);
	}
}
function getOnReadCallback (fileName, fileType)
{
	console.log("getOnReadCallback fileName=" + fileName);
	console.log("getOnReadCallback fileType=" + fileType);
	return function (event)
	{
		if (event.target.readyState != FileReader.DONE) return;
		writeFile(fileName, fileType, event);
	}
}
function writeFile (fileName, fileType, readerEvent)
{
	console.log("writeFile " + fileName );
	console.log("fileType " + fileType );
	console.log("readerEvent " + readerEvent );
	webkitRequestFileSystem(PERSISTENT, 1024*1024, function(fileSystem)
	{
		fileSystem.root.getDirectory(AUDIO_DATA_DIR, {create:true}, function(directory)
		{
			directory.getFile(fileName, {create:true}, function(fileEntry)
			{
				console.log(fileEntry.toURL());
				fileEntry.createWriter(function(writer)
				{
					var blobBuilder = new WebKitBlobBuilder();
					blobBuilder.append(readerEvent.target.result);
	
					writer.onwrite = function(entry)
					{
						console.log("writing. " + entry);
					};
					writer.onwriteend = function(entry)
					{
						console.log("write completed. " + fileEntry.toURL());
						readSoundDirectory(renderListAndSave);
					};
					writer.onerror = function(error)
					{
						alert("write failed : " + error);
					};
					writer.write(blobBuilder.getBlob(fileType));
				}, 
				onFileError);
			}, 
			onFileError);
		},
		onFileError);
	});
}
function renderListAndSave (soundEffects) 
{
	renderList(soundEffects);
	SoundEffect.saveAll();
}

var fileSelector;
var volumeRange;
var labelFrom;
var labelTo;
var labelSave;
function initConfig ()
{
	fileSelector = document.getElementById('fileSelector');
	fileSelector.addEventListener('change', readFile);
	readSoundDirectory(renderList);
	volumeRange = document.getElementById("masterVolume");
	volumeRange.value = Player.getMasterVolume();
	volumeRange.addEventListener("change", onVolumeChange, false);
	labelFrom = document.getElementById("labelFrom");
	labelTo = document.getElementById("labelTo");
	labelSave = document.getElementById("labelSave");
	labelFrom.value = Label.getLabelFrom();
	labelTo.value = Label.getLabelTo();
	labelSave.addEventListener("click", saveLabelValues, false);
	var rand = Math.floor(Math.random()*7);
	document.getElementById('random_cat').src = '../img/random_cat/roux' + rand + ".jpg";
	localize();
}

function saveLabelValues ()
{
	// Allow empty string
	Label.setLabelFrom(labelFrom.value);
	Label.setLabelTo(labelTo.value);
	alert("保存しました。");
}
function onVolumeChange (sender)
{
	Player.setMasterVolume (volumeRange.value);
}
window.onload = initConfig; 