
function readFile (event)
{
	var file = event.target.files[0];
	writeFile();
}
function writeFile ()
{
	webkitRequestFileSystem(PERSISTENT, 1024*1024, function(fileSystem)
	{
		fileSystem.root.getDirectory('data', {create:true}, function(directory)
		{
			directory.getFile("NyaaNyaaNyaa2.txt", {create:true}, function(fileEntry)
			{
				console.log(fileEntry.toURL());
				fileEntry.createWriter(function(writer)
				{
					var blobBuilder = new WebKitBlobBuilder();
					blobBuilder.append("NyaaNyaaNyaa!!");
	
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
					writer.write(blobBuilder.getBlob("text/plain"));
				}, 
				onFileError);
			}, 
			onFileError);
			directory.createReader().readEntries (function(files) 
			{
				console.log("files=" + files.length);
				if (files.length)
				{
					for (var i=0; i<files.length; i++)
					{
						console.log("Name=" + files[i].name);
					}
				}
			},
			onFileError)
		});
	onFileError);

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
}