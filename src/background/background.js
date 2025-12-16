chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'CAPTURE_TAB') {
      chrome.tabs.captureVisibleTab(
        null,
        { format: 'png' },
        dataUrl => sendResponse({ dataUrl })
      );
      return true;
    }
  });
  