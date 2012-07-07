var DEFAULT_VOLUME_PERCENTAGE = 100;
var SoundEffect = function (options)
{
	this.url = options.url;
	this.name = options.name;
	this.date = options.date;
	this.volume = options.volume; //Percentage
	this.enabled = options.enabled;
	this.isBuiltIn = options.isBuiltIn;
};


SoundEffect.prototype.play = function ()
{
	console.log("play " + this.url);
	var audio = new Audio(this.url);
	audio.play();

};

SoundEffect.prototype.delete = function ()
{

};

var STORAGE_KEY_SOUNDS = "sound";
// JSON save & load
SoundEffect.saveAll = function ()
{
	console.log("SoundEffect.saveAll");
	console.log(JSON.stringify(SoundEffect.list));
	localStorage[STORAGE_KEY_SOUNDS] = JSON.stringify(SoundEffect.list);
};
SoundEffect.loadAll = function ()
{
	try
	{
		SoundEffect.importedList = JSON.parse(localStorage[STORAGE_KEY_SOUNDS]);
	}
	catch (ex) 
	{
		console.log(ex);
	}
};
SoundEffect.importedList = [];

SoundEffect.getDefaultSoundEffects = function ()
{
	return [
		SoundEffect.createBuiltInSoundEffects("にゃー1","audio/nya.mp3"),
		SoundEffect.createBuiltInSoundEffects("にゃー2","audio/dora.mp3"),
		SoundEffect.createBuiltInSoundEffects("にゃー3","audio/dora2.mp3"),
		SoundEffect.createBuiltInSoundEffects("にゃー4","audio/gustav.mp3"),
		SoundEffect.createBuiltInSoundEffects("にゃー5","audio/gustav2.mp3")
	];
};
SoundEffect.createBuiltInSoundEffects = function (name, extensionPath)
{
	return new SoundEffect({
		name:name,
		url:chrome.extension.getURL(extensionPath),
		volume: DEFAULT_VOLUME_PERCENTAGE,
		isBuiltIn: true,
		enabled: true
	});
};

SoundEffect.applySavedPreferences = function (soundEffects) 
{
	SoundEffect.loadAll();
	for (var i=0; i<soundEffects.length; i++)
	{
		var soundEffect = soundEffects[i];
		for (j=0; j<SoundEffect.importedList.length; j++) 
		{
			var pref = SoundEffect.importedList[j];
			if (soundEffect.url == pref.url)
			{
				soundEffect.name = pref.name;
				soundEffect.enabled = pref.enabled;
			}
		}
	}
};
