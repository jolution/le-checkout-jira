// TODO: add base config for isEmoji
// import CONFIG from "../config.js";
// console.log(CONFIG.EMOJI);

// In-page cache of the user's options
const options = {};
const optionsForm = document.getElementById('optionsForm');

// Immediately persist options changes
optionsForm.emoji.addEventListener('change', (event) => {
  options.emoji = event.target.checked;
  // biome-ignore lint/correctness/noUndeclaredVariables: Chrome extension
  chrome.storage.sync.set({ options });
});

// Initialize the form with the user's option settings
// biome-ignore lint/correctness/noUndeclaredVariables: Chrome extension
const data = await chrome.storage.sync.get('options');
Object.assign(options, data.options);
optionsForm.emoji.checked = Boolean(options.emoji);
