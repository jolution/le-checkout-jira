import CONFIG from "./config.js";
import {getTranslation} from './language.js';

const TRANSLATION = getTranslation();

// Function to insert a new node after a reference node
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Function to check and limit the maximum length of text
function checkMaxLength(text) {
    return text.length > 255 ? text.slice(0, 255) : text;
}

function approveValidGitBranchName(branchName) {
    // Ersetze ungültige Zeichen durch Leerzeichen
    const sanitizedBranchName = branchName.replace(/[^a-zA-Z0-9\/\-_]/g, '');

    // Überprüfe die maximale Länge
    return checkMaxLength(sanitizedBranchName);
}

// Function to log a message if LogLevel is greater than 0
function logThis(message) {
    if (CONFIG.LOG_LEVEL > 0) {
        // eslint-disable-next-line no-console
        console.log(`${CONFIG.LOG_IDENTIFIER} ${message}`);
    }
}

if (window.location.href.startsWith(CONFIG.TARGET_URL)) {
    logThis(`URL starts with ${CONFIG.TARGET_URL}`);

    window.onload = function () {
        logThis('Page fully loaded');
        const waitForJIRA = setInterval(function () {
            logThis('Checking for JIRA...');
            if (typeof JIRA !== 'undefined' && typeof JIRA.Issue !== 'undefined' && typeof JIRA.Issue.getIssueKey === 'function') {
                clearInterval(waitForJIRA);
                logThis('JIRA is available');

                const issueNumber = JIRA.Issue.getIssueKey();

                // Extracting the title
                const titleElement = document.getElementById('summary-val');
                const title = titleElement.textContent.trim();
                const prefixes = ['feature', 'fix', 'build', 'ci', 'docs', 'perf', 'refactor', 'style', 'test', 'chore', 'research'];
                const typeElement = document.getElementById("type-val");

                // Creating the container element
                const containerElement = document.createElement('div');
                containerElement.id = 'browser-extension-gitbranch__container';

                // Selecting the target for the input field and adding the input field
                const devStatusPanel = document.getElementById('viewissue-devstatus-panel');
                // devStatusPanel.appendChild(containerElement);
                insertAfter(containerElement, devStatusPanel);

                /**
                 * Generate Option list from defined prefixes
                 * @author Jochen Simon <jochen.simon@atos.net>
                 * @returns {string} Option fields
                 */
                window.prefixesSelectOptions = () => {
                    let options = ''
                    if (prefixes) {
                        for (const prefix of prefixes) {
                            options += `<option value="${prefix}" ${(prefix === 'fix' && typeElement?.textContent.trim() === "Bug") ? "selected" : ""} onclick="updateBranchName()">${prefix}</option>`
                        }
                    }
                    return options
                }

                /**
                 * Updates the input field value with git checkout command
                 * @author Jochen Simon <jochen.simon@atos.net>
                 * @param {string} prefix
                 */
                window.updateGitCommand = (prefix) => {
                    const elem = document.getElementById('browser-extension-gitbranch__input');
                    elem.value = setGitCommand(prefix);
                }

                /**
                 * Copy the content of the input field
                 */
                window.copyGitCommand = () => {
                    const elem = document.getElementById('browser-extension-gitbranch__input');
                    elem.select();
                    document.execCommand('copy');
                }

                /**
                 * Format page title to fit GitHub branch name and add the prefix parameter
                 * @param {string} prefix
                 * @returns {string} formatted branch name
                 */
                window.getBranchName = (prefix) => {
                    // TODO: duplicate code, please outsource to function 2/2
                    const formattedBranchName = approveValidGitBranchName(`${title.toLowerCase().replace(/\s+/g, '-')}`);
                    return `${prefix}/${issueNumber}-${formattedBranchName}`;
                }

                /**
                 * Set the git checkout command
                 * @param {string} prefix
                 * @returns {string} formatted GitHub command
                 */
                window.setGitCommand = (prefix) => {
                    const branch = getBranchName(prefix);
                    return `git checkout -b ${branch}`;
                }

                /**
                 * Updates the input field value with git checkout command
                 * @param {string} prefix
                 */
                window.updateBranchName = (prefix) => {
                    const elem = document.getElementById('browser-extension-gitbranch__input');
                    elem.value = setGitCommand(prefix);
                }

                const container = `
				<div id="gitbranch-devstatus" class="module toggle-wrap">
					<div id="gitbranch-devstatus_heading" class="mod-header">
						<button class="aui-button toggle-title" aria-label="Gitbranch" aria-controls="gitbranch-devstatus" aria-expanded="false" resolved>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
								<g fill="none" fill-rule="evenodd">
									<path d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z" fill="#344563">
									</path>
								</g>
							</svg>
						</button>
						<h4 class="toggle-title" id="gitbranch-devstatus-label">
							${TRANSLATION.COPY_GIT_COMMAND}
						</h4>
						<ul class="ops"></ul>
					</div>
					<div class="mod-content">
						<div class="message-container">
							<div class="field-group">
								<label for="browser-extension-gitbranch__select">
									${TRANSLATION.TYPE} <span class="visually-hidden">${TRANSLATION.REQUIRED}</span>
									<span class="aui-icon icon-required" aria-hidden="true"></span>
								</label>
								<select id="browser-extension-gitbranch__select" class="aui-button" onchange="updateGitCommand(this.value)">
									<option hidden disabled value>${TRANSLATION.SELECT_PROMPT}</option>
									${prefixesSelectOptions()}
								</select>
							</div>
							<div class="flex-container space-between form maxw-36">
								<form class="aui w-100">
									<input id="browser-extension-gitbranch__input" class="text long-field" readonly="readonly" value="${setGitCommand('feature')}">
								</form>
								<div class="ml-1">
									<button class="aui-button" onclick="copyGitCommand()">
										<span class="aui-icon aui-icon-small aui-iconfont-copy icon-copy"></span> ${TRANSLATION.COPY_BUTTON_TEXT}
									</button>
								</div>
							</table>
						</div>
					</div>
				</div>`;

                containerElement.insertAdjacentHTML("afterend", container)
            }
        }, 100);
    }
}
