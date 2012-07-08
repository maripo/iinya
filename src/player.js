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