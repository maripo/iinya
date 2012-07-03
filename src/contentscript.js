// mew mew mew
var audio = new Audio(chrome.extension.getURL("audio/nya.mp3"));

function playSound ()
{
	audio.play();
}
function findAndChangeLikeButtons ()
{
	var allButtons = document.getElementsByTagName('BUTTON');
	var likeClassRegEx = new RegExp(".*like_link( |$)");
	var likeButtons = [];
	for (var i=0, l=allButtons.length; i<l; i++)
	{
		var button = allButtons[i];
		console.log(button.className);
		if (button.className && button.className.match(likeClassRegEx))
		{
			button.style.border = "2px solid red";
			likeButtons.push(button);
			button.addEventListener ("click", playSound, false);
		}
	}

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
findAndChangeLikeButtons();