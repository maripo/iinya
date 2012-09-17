// mew mew mew
var labelFrom = "いいね";
var labelTo = "いいニャ";
var iframeContainer = document.createElement("DIV");
with (iframeContainer.style)
{
	width = "1px";
	height = "1px";
	overflow = "hidden";
	opacity = 0;
}
document.body.appendChild(iframeContainer);

function findAndChangeLikeButtons ()
{
	var allButtons = document.getElementsByTagName('A');
	for (var i=0, l=allButtons.length; i<l; i++)
	{
		var button = allButtons[i];
		if ((!button.iinyaListenerAdded || button.innerHTML != button.replacedText) && isLikeButton(button))
		{
			applyButtonExtra (button);
		}
	}

}
function isLikeButton (button)
{
	return (button.innerHTML.indexOf(labelFrom)>=0 && button.id && button.id.indexOf('reactRoot')>=0);
}
function applyButtonExtra (button)
{
	button.addEventListener ("click", play, false);
	var spans = button.getElementsByTagName("SPAN");
	if (spans.length==0)
	{
		button.innerHTML = button.innerHTML.replace(labelFrom, labelTo);
	}
	for (var i=0, l=spans.length; i<l; i++)
	{
		var span = spans[i];
		span.innerHTML = span.innerHTML.replace(labelFrom, labelTo);
	}
	button.replacedText = button.innerHTML;
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
	button.addEventListener ("click", play, false);
	document.body.appendChild(button);
}
function play ()
{
	var iframe = document.createElement("IFRAME");
	iframe.src = chrome.extension.getURL("play.html");
	iframeContainer.appendChild(iframe);
}

audios = SoundEffect.getDefaultSoundEffects();
//uiTest();
chrome.extension.onRequest.addListener
(
	function (request, sender, sendResponse) 
	{
		labelFrom = request.labelFrom;
		labelTo = request.labelTo;
		findAndChangeLikeButtons();
		window.setInterval(findAndChangeLikeButtons, 2000);
	}
);