var audio = new Audio(chrome.extension.getURL("audio/nya.mp3"));

function playSound ()
{
	audio.play();
}
