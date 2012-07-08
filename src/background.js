chrome.tabs.onUpdated.addListener(tabOnUpdate);
var REGEX_URL = new RegExp("http(|s)://www\\.facebook\\.com($|/)");
var tabOnUpdate = function(tabId, changeInfo, tab)
{
	var url = tab.url;
	if (url !== undefined && url.match(REGEX_URL) && changeInfo.status == "complete") 
	{
		chrome.tabs.sendRequest(tabId,
		{
			labelFrom: Label.getLabelFrom(),
			labelTo: Label.getLabelTo()
		},
		null
		);
	}
}