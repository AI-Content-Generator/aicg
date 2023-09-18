chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 

  if (request == "OpenPopup") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "popup-modal"}, function(response) {});  
    });
  }

  if (request == "closeModal") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "close-popup-modal"}, function(response) {});  
    });
  }

})


