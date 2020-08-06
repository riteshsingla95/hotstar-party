chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ state: 'NOT_INITIALIZED' }, function () {
    console.log("The plugin has not been Initialized.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.hotstar.com', pathContains: '/watch' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});