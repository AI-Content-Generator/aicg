// Create the buttonContainer element and set its text content
var buttonContainer = document.createElement("button");
buttonContainer.textContent = 'AI QuickDraft';

// Apply styles to the button using the style property
buttonContainer.style.backgroundColor = "#10B981";
buttonContainer.style.color = "white";
buttonContainer.style.padding = "0.5rem";
buttonContainer.style.borderRadius = "4px";
buttonContainer.style.fontSize = "0.875rem";
buttonContainer.style.minWidth = "100px";
buttonContainer.style.justifyContent = "space-between";
buttonContainer.style.alignItems = "center";
buttonContainer.style.margin = "0.4rem";

function findMainElement(rootNode) {
  const elements = document.querySelectorAll('header[data-projection-id="2"]');

  if (elements.length > 0) {
    return elements[elements.length-1]
  } else {
    return null
  }
}

var mainElement = null
// Check every second to see if the DOM has been fully loaded and the mainElement can be found 
const pollInterval = setInterval(function() {
  mainElement = findMainElement(document.body);
  if (mainElement) {
    clearInterval(pollInterval);
    mainElement.appendChild(buttonContainer);
  } else {
    console.log("Main element not found yet.");
  }
}, 1000); 


buttonContainer.addEventListener("click", () => {
    chrome.runtime.sendMessage("OpenPopup")
    chrome.runtime.sendMessage("popup-modal")
})


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'popup-modal') {
        showModal();
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
        <button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
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
    

// function insertText(text) {
//       // Access the generated text from the response object
//   var generatedText = text;

//   var text = document.querySelector("textarea")
//   text.textContent = "hello world"
//   text.value = "12312313"

//     // document.getElementById("prompt-textarea").value= text;
// }