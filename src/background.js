var REGEX_FACEBOOK = new RegExp("http(|s)://www\\.facebook\\.com($|/)");
var REGEX_TWITTER = new RegExp("http(|s)://twitter\\.com($|/)");
var REGEX_GOOGLEPLUS = new RegExp("http(|s)://plus\\.google\\.com($|/)");

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var url = request.url;
		var enabled = (url && (
				(url.match(REGEX_FACEBOOK) && Player.isFacebookEnabled())
				||
				(url.match(REGEX_TWITTER) && Player.isTwitterEnabled())
				||
				(url.match(REGEX_GOOGLEPLUS) && Player.isGoogleplusEnabled())
				));
		sendResponse({
			enabled: enabled,
			labelFrom: Label.getLabelFrom(),
			labelTo: Label.getLabelTo()});
});