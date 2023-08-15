chrome.runtime.onMessage.addListener(request => {

  if (request == "OpenPopup") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action: "popup-modal"}, function(response) {});  
      });
  }

})


// function insertText(text) {
//   document.getElementById("prompt-textarea").value= text;
// }