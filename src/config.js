var AUDIO_DATA_DIR = 'data';
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
	li.appendChild(this.getPlayButton());
	li.appendChild(this.getRenameButton());
	li.appendChild(this.getDeleteButton());
	return li;
};
SoundEditor.prototype.getCheckbox = function ()
{
	var checkbox = document.createElement("INPUT");
	checkbox.type = "checkbox";
	checkbox.checked = this.sound.enabled;
	this.checkbox = checkbox;
	this.checkbox.onclick = this.getToggleEnabledAction();
	return checkbox;
};
SoundEditor.prototype.getNameSection = function ()
{
	var div = document.createElement("DIV");
	div.className = "nameSection";
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
	a.innerHTML = "Play";
	a.href = "#";
	a.onclick = this.getPlayAction();
	return a;
};
SoundEditor.prototype.getRenameButton = function ()
{
	var a = document.createElement("A");
	a.innerHTML = "Rename";
	a.href = "#";
	a.onclick = this.getRenameAction();
	return a;
};

SoundEditor.prototype.getDeleteButton = function ()
{
	var a = document.createElement("A");
	a.innerHTML = "Delete";
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
		alert("TODO toggle checked=" + self.checkbox.checked);
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
	} 
};
SoundEditor.prototype.getSaveNameAction = function ()
{
	var self = this;
	return function (event)
	{
		self.sound.name = self.nameEdit.value;
		console.log("SoundEditor.prototype.getSaveNameAction TODO validation");
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
		alert("TODO delete");
	}
};

function readSoundDirectory ()
{
	webkitRequestFileSystem(PERSISTENT, 1024*1024, function(fileSystem)
	{
		fileSystem.root.getDirectory(AUDIO_DATA_DIR, {create:true}, function(directory)
		{
			directory.createReader().readEntries (function(files) 
			{
				document.getElementById("audio_list").innerHTML = '';
				if (files.length)
				{
					var soundEffects = SoundEffect.getDefaultSoundEffects();
					for (var i=0; i<files.length; i++)
					{
						var file = files[i];
						var soundEffect = new SoundEffect({
							url: file.toURL(),
							name: file.name,
							date: new Date(),
							volume: DEFAULT_VOLUME_PERCENTAGE,
							enabled: true,
							isBuiltIn: false
						});
						soundEffects.push(soundEffect);
						
					}
					renderList(soundEffects);
				}
			},
			onFileError)
		},
		onFileError)
	});
}

function renderList (soundEffects)
{	
	SoundEffect.list = soundEffects;
	for (var i=0; i<soundEffects.length; i++)
	{
		var soundEditor = new SoundEditor(soundEffects[i]);
		document.getElementById("audio_list").appendChild(soundEditor.getLiElement());
	}
}
var REGEX_FILE_TYPE_AUDIO = new RegExp("audio\\/.*");
function readFile (event)
{
	var file = event.target.files[0];
	console.log("File Type: " + file);
	for (var key in file)
	{
		console.log(key + "=" + file[key]);
	}
	var isAudioFile = file.type && file.type.match(REGEX_FILE_TYPE_AUDIO);
	if (isAudioFile)
	{
		var reader = new FileReader();
		reader.onload = getOnReadCallback (file.name, file.type);
		reader.readAsArrayBuffer(file);
	}
	else
	{
		alert("音声ファイルではないようです。");
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
						readSoundDirectory();
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

function onFileError (error)
{
	console.log("Error occured. " + error);
	for (var key in error)
	{
		console.log(key + "=" + error[key]);
	}
}
var fileSelector;
function initConfig ()
{
	fileSelector = document.getElementById('fileSelector');
	fileSelector.addEventListener('change', readFile);
	SoundEffect.loadAll();
	readSoundDirectory();
}