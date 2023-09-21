/*function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}*/

const LogIdentifier = '[JOLUTION] ', LogLevels = 0;
function logThis(message) {
    if (LogLevels > 0) {
        console.log(`${LogIdentifier} ${message}`);
    }
}

// TODO: Insert target Url here
const targetURL = 'INSERT_URL_HERE';

if (window.location.href.startsWith(targetURL)) {
    logThis(`Url starts with ${targetURL}`);

    window.onload = function() {
        logThis('Page fully loaded');

        // TODO: Insert your code here

    }
}
