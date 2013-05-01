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
 * Facebook Widgets
 */
var FacebookWidgetManager = function () {
	this.name = 'Facebook Widgets';
	this.meowButtonTagName = 'BUTTON';
};
FacebookWidgetManager.prototype.isMeowButton = function (button) {
	return true;
	
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
/**
 * Google+
 */
var GoogleplusManager = function () {
	this.name = 'Google+';
	this.meowButtonTagName = 'DIV';
};
GoogleplusManager.BUTTON_REGEX = new RegExp('(^| )favorite($| )');
GoogleplusManager.prototype.isMeowButton = function (button) {
	return (button.className && button.getAttribute("data-tooltip")=="+1 this post");
};

function createSiteManager () {
	if (location.href.match(new RegExp('http(s)?://twitter\.com(/)?')))
		return new TwitterManager();
	if (location.href.match(new RegExp('http(s)?://plus\.google\.com(/)?')))
		return new GoogleplusManager();
	if (location.href.match(new RegExp('http(s)?://www\.facebook\.com/plugins/like\.php')))
		return new FacebookWidgetManager();
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
console.log(location.href);
chrome.runtime.sendMessage(
		{url: location.href}, function(response) {
			if (!response.enabled) return;
			siteManager = createSiteManager();
			labelFrom = response.labelFrom;
			labelTo = response.labelTo;
			findAndChangeLikeButtons();
			window.setInterval(findAndChangeLikeButtons, 2000);
	}
);