var volumeRange;
var AUDIO_COUNT = 8;
function initIndex ()
{
	audios = SoundEffect.getDefaultSoundEffects();
	volumeRange = document.getElementById("masterVolume");
	volumeRange.value = Player.getMasterVolume();
	volumeRange.addEventListener("change", onVolumeChange, false);
	for (var i=0; i<AUDIO_COUNT; i++)
	{
		document.getElementById('playButton['+i+']').addEventListener('click', getButtonFunction(i));
	}
	document.getElementById('playRandomButton').addEventListener('click', playSound);
}
function getButtonFunction (i)
{
	return function () { playSoundAt(i); };
}

function onVolumeChange (sender)
{
	Player.setMasterVolume (volumeRange.value);
}
window.onload = initIndex;