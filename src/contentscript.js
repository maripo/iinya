// mew mew mew

function findAndChangeLikeButtons ()
{
	var allButtons = document.getElementsByTagName('BUTTON');
	var likeClassRegEx = new RegExp(".*like_link( |$)");
	for (var i=0, l=allButtons.length; i<l; i++)
	{
		var button = allButtons[i];
		if (!button.iinyaListenerAdded && button.className && button.className.match(likeClassRegEx))
		{
			applyButtonExtra (button);
		}
	}

}
function applyButtonExtra (button)
{
	button.addEventListener ("click", playSoundBackground, false);
	var spans = button.getElementsByTagName("SPAN");
	for (var i=0, l=spans.length; i<l; i++)
	{
		var span = spans[i];
		span.innerHTML = span.innerHTML.replace("いいね", "いいニャ");
	}
	button.iinyaListenerAdded = true;
}

function uiTest ()
{
	var button = document.createElement('INPUT');
	button.type = "BUTTON";
	with (button.style)
	{
		position = "absolute";
		left = "0px";
		top = "0px";
		zIndex = 9999;
	}
	button.value = "Mew";
	button.addEventListener ("click", playSoundBackground, false);
	document.body.appendChild(button);
}
var bgCallback = null;
function playSoundBackground ()
{
	bgCallback({command:"play"});
;}

chrome.extension.onRequest.addListener
(
	function (request, sender, _bgCallback) 
	{
		bgCallback = _bgCallback;
	}
);
audios = SoundEffect.getDefaultSoundEffects();
findAndChangeLikeButtons();
uiTest();
window.setInterval(findAndChangeLikeButtons, 2000);