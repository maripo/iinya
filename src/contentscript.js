// mew mew mew
var audio = new Audio(chrome.extension.getURL("audio/nya.mp3"));

function playSound ()
{
	audio.play();
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
	button.addEventListener ("click", playSound, false);
	document.body.appendChild(button);
}
uiTest();