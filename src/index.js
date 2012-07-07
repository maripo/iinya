var volumeRange;
function initIndex ()
{
	audios = SoundEffect.getDefaultSoundEffects();
	volumeRange = document.getElementById("masterVolume");
	volumeRange.value = Player.getMasterVolume();
	volumeRange.addEventListener("change", onVolumeChange, false);
}

function onVolumeChange (sender)
{
	Player.setMasterVolume (volumeRange.value);
}