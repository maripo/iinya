var REGEX_FACEBOOK = new RegExp("http(|s)://www\\.facebook\\.com($|/)");
var REGEX_TWITTER = new RegExp("http(|s)://twitter\\.com($|/)");
var REGEX_GOOGLEPLUS = new RegExp("http(|s)://plus\\.google\\.com($|/)");

var tabOnUpdate = function(tabId, changeInfo, tab)
{
	var url = tab.url;
	if (url !== undefined && changeInfo.status == "complete") 
	{
		if (
			(url.match(REGEX_FACEBOOK) && Player.isFacebookEnabled())
			||
			(url.match(REGEX_TWITTER) && Player.isTwitterEnabled())
			||
			(url.match(REGEX_GOOGLEPLUS) && Player.isGoogleplusEnabled())
			) 
		{
			console.log("Add meow button");
			chrome.tabs.sendRequest(tabId,
					{
						labelFrom: Label.getLabelFrom(),
						labelTo: Label.getLabelTo()
					},
					null
					);
		}
	}
}
chrome.tabs.onUpdated.addListener(tabOnUpdate);