var AUDIO_DATA_DIR = 'data';
function readSoundDirectory (callback)
{
	webkitRequestFileSystem(PERSISTENT, 1024*1024, function(fileSystem)
	{
		fileSystem.root.getDirectory(AUDIO_DATA_DIR, {create:true}, function(directory)
		{
			directory.createReader().readEntries (function(files) 
			{
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
					SoundEffect.applySavedPreferences(soundEffects);
					if (callback) callback(soundEffects);
				}
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