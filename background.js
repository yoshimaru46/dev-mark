chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.storage.local.get(null, (configs) => {
    if (message.method == 'getConfig') {
      sendResponse({ data: configs.devMarkConfig });
    }
  });
  return true;
});
