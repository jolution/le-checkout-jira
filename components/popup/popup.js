import CONFIG from "/components/content/config.js";

// TODO: add base config for isEmoji
console.log(CONFIG.isEmoji);


// In-page cache of the user's options
const options = {};
const optionsForm = document.getElementById("optionsForm");

// Immediately persist options changes
optionsForm.emoji.addEventListener("change", (event) => {
    options.emoji = event.target.checked;
    chrome.storage.sync.set({options});
});

// Initialize the form with the user's option settings
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);
optionsForm.emoji.checked = Boolean(options.emoji);
