
var AUDIO_DATA_DIR = 'data';
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
						var sound = new Sound(files[i]);
						document.getElementById("audio_list").appendChild(sound.getLiElement());
					}
				}
			},
			onFileError)
		},
		onFileError)
	});

}
var Sound = function (file) 
{
	this.name = file.name;
	this.url = file.toURL();
};
Sound.prototype.getLiElement = function ()
{
	var li = document.createElement("LI");
	var a = document.createElement("A");
	a.innerHTML = this.name;
	a.href = "#";
	a.onclick = this.getPlayAction();
	li.appendChild(a);
	return li;
};
Sound.prototype.getPlayAction = function ()
{
	var self = this;
	return function (event)
	{
		self.play();
	}
};
Sound.prototype.play = function ()

{
		console.log("play " + this.url);
		var audio = new Audio(this.url);
		audio.play();

};
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