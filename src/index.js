var volumeRange;
var AUDIO_COUNT = 8;

var checkFacebook;
var checkTwitter;

function initIndex ()
{
	checkFacebook = document.getElementById('enable_facebook');
	checkTwitter = document.getElementById('enable_twitter');
	checkFacebook.checked = Player.isFacebookEnabled();
	checkTwitter.checked = Player.isTwitterEnabled();
	audios = SoundEffect.getDefaultSoundEffects();
	volumeRange = document.getElementById("masterVolume");
	volumeRange.value = Player.getMasterVolume();
	volumeRange.addEventListener("change", onVolumeChange, false);
	for (var i=0; i<AUDIO_COUNT; i++)
	{
		document.getElementById('playButton['+i+']').addEventListener('click', getButtonFunction(i));
	}
	document.getElementById('playRandomButton').addEventListener('click', playSound);
	checkTwitter.addEventListener('change', onSiteConfigChange);
	checkFacebook.addEventListener('change', onSiteConfigChange);
}
function getButtonFunction (i)
{
	return function () { playSoundAt(i); };
}

function onVolumeChange (sender)
{
	Player.setMasterVolume (volumeRange.value);
}
function onSiteConfigChange (sender) {
	var twitter = checkTwitter.checked;
	var facebook = checkFacebook.checked;
	Player.saveSiteConfig ({twitter:twitter, facebook:facebook});
}
window.onload = initIndex;