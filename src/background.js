var audios = [];

var audios = null;
function readConfig()
{
	if (localStorage[STORAGE_KEY_SOUNDS])
	{
		try
		{
			all = JSON.parse(localStorage[STORAGE_KEY_SOUNDS]);
			audios = [];
			for (var i=0; i<all.length; i++)
			{
				var audio = all[i];
				console.log("name=" + audio.url);
				if (audio.enabled)
					audios.push(new SoundEffect(audio));
			}
		}
		catch (ex) 
		{
			console.log(ex);
		}
	}
	if (!audios || 0==audios.length)
	{
		audios = SoundEffect.getDefaultSoundEffects();
	}
}
readConfig();

var URL_REGEX = new RegExp("http(s|)://www\\.facebook\\.com($|/)");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)
	{
		if (tab.url && tab.url.match(URL_REGEX) && changeInfo.status == "complete")
		{
			chrome.tabs.sendRequest(tabId,
			{
			},
			getPlayRandomSoundAndRegisterCallback(tabId));
		}
	}
);
function getPlayRandomSoundAndRegisterCallback (tabId)
{
	return function (param)
	{
		console.log("tabId=" + tabId);
		if ("play"==param.command)
		{
			playSound();
			chrome.tabs.sendRequest(tabId,
			{
			},
			getPlayRandomSoundAndRegisterCallback(tabId));
		}
	}
}
function reload()
{
	readConfig();
}