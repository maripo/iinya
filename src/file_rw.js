var AUDIO_DATA_DIR = 'data';
function readSoundDirectory (callback)
{
	console.log("readSoundDirectory");
	webkitRequestFileSystem(PERSISTENT, 1024*1024, function(fileSystem)
	{
		fileSystem.root.getDirectory(AUDIO_DATA_DIR, {create:true}, function(directory)
		{
			directory.createReader().readEntries (function(files) 
			{
				var soundEffects = SoundEffect.getDefaultSoundEffects();
				if (files.length)
				{
					for (var i=0; i<files.length; i++)
					{
						var file = files[i];
						var soundEffect = new SoundEffect({
							url: file.toURL(),
							name: file.name,
							date: new Date(),
							volume: DEFAULT_VOLUME_PERCENTAGE,
							enabled: true,
							fileName: file.name,
							isBuiltIn: false
						});
						soundEffects.push(soundEffect);
						
					}
				}
				SoundEffect.applySavedPreferences(soundEffects);
				if (callback) callback(soundEffects);
			},
			onFileError)
		},
		onFileError)
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