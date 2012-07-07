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