var volumeRange;
var AUDIO_COUNT = 8;

var checkFacebook;
var checkTwitter;
var checkGoogleplus;

function initIndex ()
{
	checkFacebook = document.getElementById('enable_facebook');
	checkTwitter = document.getElementById('enable_twitter');
	checkGoogleplus = document.getElementById('enable_googleplus');
	checkFacebook.checked = Player.isFacebookEnabled();
	checkTwitter.checked = Player.isTwitterEnabled();
	checkGoogleplus.checked = Player.isGoogleplusEnabled();
	audios = SoundEffect.getDefaultSoundEffects();
	volumeRange = document.getElementById("masterVolume");
	volumeRange.value = Player.getMasterVolume();
	volumeRange.addEventListener("change", onVolumeChange, false);
	for (var i=0; i<AUDIO_COUNT; i++)
	{
		document.getElementById('playButton['+i+']').addEventListener('click', getButtonFunction(i));
	}
	document.getElementById('playRandomButton').addEventListener('click', playSound);
	checkFacebook.addEventListener('change', onSiteConfigChange);
	checkTwitter.addEventListener('change', onSiteConfigChange);
	checkGoogleplus.addEventListener('change', onSiteConfigChange);
	
	localize();
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
	var facebook = checkFacebook.checked;
	var twitter = checkTwitter.checked;
	var googleplus = checkGoogleplus.checked;
	Player.saveSiteConfig ({
		facebook:facebook,
		twitter:twitter, 
		googleplus:googleplus});
}
window.onload = initIndex;