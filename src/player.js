var audios = [
	new Audio(chrome.extension.getURL("audio/nya.mp3")),
	new Audio(chrome.extension.getURL("audio/dora.mp3")),
	new Audio(chrome.extension.getURL("audio/dora2.mp3")),
	new Audio(chrome.extension.getURL("audio/gustav.mp3")),
	new Audio(chrome.extension.getURL("audio/gustav2.mp3")),
	new Audio(chrome.extension.getURL("audio/gabu0.mp3")),
	new Audio(chrome.extension.getURL("audio/gabu1.mp3")),
	new Audio(chrome.extension.getURL("audio/gabu2.mp3"))
	];

function playSound ()
{
	playSoundAt (Math.floor(Math.random()*audios.length));
}
function playSoundAt (index)
{
	audios[index].play();
}