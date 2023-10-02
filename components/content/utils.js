// Function to log a message if LogLevel is greater than 0
import CONFIG from "./config.js";

export function logThis(message) {
    if (CONFIG.LOG_LEVEL > 0) {
        // eslint-disable-next-line no-console
        console.log(`${CONFIG.LOG_IDENTIFIER} ${message}`);
    }
}

// Function to insert a new node after a reference node
export function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
