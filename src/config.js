var AUDIO_DATA_DIR = 'data';
var DEFAULT_VOLUME_PERCENTAGE = 100;

var SoundEditor = function (sound) 
{
	this.sound = sound;
};
// Create UI elements
SoundEditor.prototype.getLiElement = function ()
{
	var li = document.createElement("LI");
	li.appendChild(this.getNameSection());
	li.appendChild(this.getPlayButton());
	li.appendChild(this.getRenameButton());
	li.appendChild(this.getDeleteButton());
	return li;
};
SoundEditor.prototype.getNameSection = function ()
{
	var div = document.createElement("DIV");
	div.innerHTML = this.sound.label;
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
		alert("TODO rename");
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
				console.log("files=" + files.length);
				if (files.length)
				{
					for (var i=0; i<files.length; i++)
					{
						var file = files[i];
						for (key in file)
						{
							console.log(key + "->" + file[key]);
						}
						var soundEffect = new SoundEffect({
							url:file.toURL(),
							label:file.name,
							date:new Date(),
							volume: DEFAULT_VOLUME_PERCENTAGE
						});
						var soundEditor = new SoundEditor(soundEffect);
						document.getElementById("audio_list").appendChild(soundEditor.getLiElement());
					}
				}
			},
			onFileError)
		},
		onFileError)
	});

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
	if (file.type && file.type.match(REGEX_FILE_TYPE_AUDIO))
	{
		console.log("matched.");
	}
	var isAudioFile = file.type && file.type.match(REGEX_FILE_TYPE_AUDIO);
	if (isAudioFile)
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
	readSoundDirectory();
}