// Create the buttonContainer element and set its text content
var buttonContainer = document.createElement("button");
buttonContainer.textContent = 'AI QuickDraft';

// Apply styles to the button using the style property
buttonContainer.style.backgroundColor = "#df4683";
buttonContainer.style.color = "white";
buttonContainer.style.padding = "0.5rem";
buttonContainer.style.borderRadius = "4px";
buttonContainer.style.fontSize = "0.875rem";
buttonContainer.style.minWidth = "118px";
buttonContainer.style.maxHeight = "80px";
buttonContainer.style.justifyContent = "space-between";
buttonContainer.style.alignItems = "center";
buttonContainer.style.margin = "1rem";

const targetSelector = '.relative.flex.h-full.flex-1.items-stretch.md\\:flex-col';
function findTargetElement(rootNode) {
  const targetElements = document.querySelectorAll(targetSelector);
  if (targetElements.length > 0) {
    return targetElements[0]
  } else {
    return null
  }
}

var targetElement = null
var timeCounter = 0;
// Check every second to see if the DOM has been fully loaded and the mainElement can be found
const pollInterval = setInterval(function() {
  // If we cannot find the element after 1 minute, we will stop the polling anyways.
  if (timeCounter >= 60000) {clearInterval(pollInterval);}

  targetElement = findTargetElement(document.body);
  // The targetElement is not where we want to insert our customized buttonContainer
  // The actual insertion location is obtained below
  if (targetElement) {
    const firstChildElement = targetElement.firstElementChild;
    if (firstChildElement) {
      firstChildElement.classList.add('flex')
      mySiblingElement = firstChildElement.firstElementChild
      if (mySiblingElement) {
        firstChildElement.insertBefore(buttonContainer, mySiblingElement)
      } else {
        console.log("mySiblingElement not found yet")
        timeCounter += 1000
      }
      clearInterval(pollInterval);
    } else {
      console.log("firstChildElement not found yet")
      timeCounter += 1000
    }
  } else {
    timeCounter += 1000
    console.log("Main element not found yet.");
  }
}, 1000); 


buttonContainer.addEventListener("click", () => {
    chrome.runtime.sendMessage("OpenPopup")
})

window.addEventListener('message', function(event) {
    if (event.data === 'closeModal') {
        chrome.runtime.sendMessage("closeModal")
        closeModal();
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'popup-modal') {
        showModal();
    }   

    // https://stackoverflow.com/questions/54126343/how-to-fix-unchecked-runtime-lasterror-the-message-port-closed-before-a-respon
    setTimeout(function() {
        sendResponse({status: true});
      }, 1);
    return true;  // uncomment this line to fix error
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'close-popup-modal') {
        closeModal();
    }
})


const showModal = () => {
    const modal = document.createElement("dialog");
    modal.setAttribute(
        "style", `
        height:500px;
        width:500px;
        border: none;
        top:150px;
        border-radius:20px;
        background-color:grey;
        position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
        `
    );
    modal.innerHTML = `<iframe id="popup-content"; style="height:100%; width:100%"></iframe>
        <div style="position:absolute; top:0px; left:5px;">
        <button style="padding: 8px 12px; font-size: 18px; border: none; border-radius: 20px; background-color:grey">x</button>
        </div>`;
    document.body.appendChild(modal);

    const dialog = document.querySelector("dialog");
    dialog.showModal();
    const iframe = document.getElementById("popup-content");
    iframe.src = chrome.runtime.getURL("index.html");
    iframe.frameBorder = 0;
    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });
}

const closeModal = () => {
    const dialog = document.querySelector("dialog");
    dialog.close();
}
    
