
var REGEX_URLS = [
                  new RegExp("http(|s)://www\\.facebook\\.com($|/)"),
                  new RegExp("http(|s)://twitter\\.com($|/)")
                  ];
var tabOnUpdate = function(tabId, changeInfo, tab)
{
	var url = tab.url;
	if (url !== undefined && changeInfo.status == "complete") 
	{
		var matched = false;
		for (var i=0; i<REGEX_URLS.length; i++) {
			if (url.match(REGEX_URLS[i]))
				matched = true;
		}
		console.log(matched)
		if (!matched) return;
		chrome.tabs.sendRequest(tabId,
		{
			labelFrom: Label.getLabelFrom(),
			labelTo: Label.getLabelTo()
		},
		null
		);
	}
}
chrome.tabs.onUpdated.addListener(tabOnUpdate);