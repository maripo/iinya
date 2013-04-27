/**
 * Facebook
 */
var FacebookManager = function () {
	this.name = 'Facebook';
	this.meowButtonTagName = 'A';
};
FacebookManager.prototype.isMeowButton = function (button) {
	return (button.innerHTML.indexOf(labelFrom)>=0 && button.id && button.id.indexOf('reactRoot')>=0);
	
};
/**
 * Twitter
 */
var TwitterManager = function () {
	this.name = 'Twitter';
	this.meowButtonTagName = 'A';
};
TwitterManager.BUTTON_REGEX = new RegExp('(^| )favorite($| )');
TwitterManager.prototype.isMeowButton = function (button) {
	return (button.className && button.className.match(TwitterManager.BUTTON_REGEX));
};

function createSiteManager () {
	if (location.href.match(new RegExp('http(s)?://twitter\.com(/)?')))
		return new TwitterManager();
	return new FacebookManager();
}

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

var siteManager = null;
function findAndChangeLikeButtons ()
{
	var allButtons = document.getElementsByTagName(siteManager.meowButtonTagName);
	for (var i=0, l=allButtons.length; i<l; i++)
	{
		var button = allButtons[i];
		if ((!button.iinyaListenerAdded || button.innerHTML != button.replacedText) && 
				siteManager.isMeowButton(button))
		{
			console.log("meow button found.");
			applyButtonExtra (button);
		}
	}

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
		siteManager = createSiteManager();
		console.log("ii-nya sitemanager="+siteManager.name);
		labelFrom = request.labelFrom;
		labelTo = request.labelTo;
		findAndChangeLikeButtons();
		window.setInterval(findAndChangeLikeButtons, 2000);
	}
);