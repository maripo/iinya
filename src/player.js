function playSound ()
{
	playSoundAt (Math.floor(Math.random()*audios.length));
}
function playSoundAt (index)
{
	audios[index].play();
}
var Player = {};
Player.getMasterVolume = function ()
{
	var masterVolume = (localStorage.masterVolume)?
		parseInt(localStorage.masterVolume):DEFAULT_VOLUME_PERCENTAGE;
	return Math.max(0, Math.min(100,masterVolume));
};
Player.setMasterVolume = function (value)
{
	localStorage.masterVolume = value;
}
var TRUE = "true";
var FALSE = "false";
var FACEBOOK_ENABLED_DEFAULT = true;
var TWITTER_ENABLED_DEFAULT = false;
var GOOGLEPLUS_ENABLED_DEFAULT = false;
Player.isFacebookEnabled = function () 
{
	return (localStorage.facebookEnabled)?(TRUE==localStorage.facebookEnabled):FACEBOOK_ENABLED_DEFAULT;
};
Player.isTwitterEnabled = function () 
{
	return (localStorage.twitterEnabled)?(TRUE==localStorage.twitterEnabled):TWITTER_ENABLED_DEFAULT;
};
Player.isGoogleplusEnabled = function () 
{
	return (localStorage.googleplusEnabled)?(TRUE==localStorage.googleplusEnabled):GOOGLEPLUS_ENABLED_DEFAULT;
};
Player.saveSiteConfig = function (option)
{
	localStorage.facebookEnabled = (option.facebook)?TRUE:FALSE;
	localStorage.twitterEnabled = (option.twitter)?TRUE:FALSE;
	localStorage.googleplusEnabled = (option.googleplus)?TRUE:FALSE;
}
var Label = {};
var LABEL_FROM_DEFAULT = chrome.i18n.getMessage('labelFromDefault');
var LABEL_TO_DEFAULT = chrome.i18n.getMessage('labelToDefault');
Label.getLabelFrom = function ()
{
	return localStorage.labelFrom || LABEL_FROM_DEFAULT;
};
Label.setLabelFrom = function (value)
{
	localStorage.labelFrom = value;
};
Label.getLabelTo = function ()
{
	return localStorage.labelTo || LABEL_TO_DEFAULT;
};
Label.setLabelTo = function (value)
{
	localStorage.labelTo = value;
};