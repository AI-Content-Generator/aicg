
var button = document.createElement("button");
button.textContent = '<<<<<<< AIGC >>>>>>>';
button.className = "button-container"
button.setAttribute('class', 'button-container');
document.body.appendChild(button);
button.addEventListener("click", () => {
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
    

