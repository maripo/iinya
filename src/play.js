var audios;
function playRandom()
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
	playSound();
}
window.onload = playRandom;