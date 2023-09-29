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

const targetURL = 'https://jira.fsc.atos-services.net/browse/';

// TODO: outsource to config file
// Info: Set the log level to 0 to disable logging
const LogLevels = 0;
const LogIdentifier = '[JOLUTION]';

// Function to log a message if LogLevels is greater than 0
function logThis(message) {
    if (LogLevels > 0) {
        // eslint-disable-next-line no-console
        console.log(`${LogIdentifier} ${message}`);
    }
}

// TODO: outsource to enum file
const DisplayPrefixesType = {
    RADIO: 'radio',
    SELECT: 'select',
};

const displayPrefixesType = DisplayPrefixesType.SELECT;

if (window.location.href.startsWith(targetURL)) {
    logThis(`URL starts with ${targetURL}`);

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
					if(prefixes) {
						for(const prefix of prefixes) {
							options += `<option value="${prefix}" ${(prefix === 'feature') ? "selected" : ""} onclick="updateBranchName()">${prefix}</option>`
						}
					}
					return options
				}

				/**
				 * Copy the content of the input field
				 * @author Jochen Simon <jochen.simon@atos.net>
				 */
				window.copyCommand = () => {
					const elem = document.getElementById('browser-extension-gitbranch__input');
					elem.select();
                    document.execCommand('copy');
				}

				/**
				 * Format page title to fit Github branch nameand add the prefix parameter
				 * @author Jochen Simon <jochen.simon@atos.net>
				 * @param {string} prefix
				 * @returns {string} formatted branch name
				 */
				window.getBranchName = (prefix) => {
					// TODO: duplicate code, please outsource to function 2/2
                    const formattedBranchName = approveValidGitBranchName(`${title.toLowerCase().replace(/\s+/g, '-')}`);
                    const formattedBranchNameWithPrefix = `${prefix}/${issueNumber}-${formattedBranchName}`;
					return formattedBranchNameWithPrefix;
				}

				/**
				 * Set the git checkout command
				 * @author Jochen Simon <jochen.simon@atos.net>
				 * @param {string} prefix
				 * @returns {string} formatted github command
				 */
				window.setBranchName = (prefix) => {
					const branch = getBranchName(prefix);
					return `git checkout -b ${branch}`;
				}

				/**
				 * Updates the input field value with git checkout command
				 * @author Jochen Simon <jochen.simon@atos.net>
				 * @param {string} prefix
				 */
				window.updateCommand = (prefix) => {
					const elem = document.getElementById('browser-extension-gitbranch__input');
					elem.value = setBranchName(prefix);
                }
                
				// TODO: @pimmok: Comments! Add them!
				const pimmContainer = `
				<div id="gitbranch-devstatus" class="module toggle-wrap">
					<div id="gitbranch-devstatus_heading" class="mod-header">
						<button class="aui-button toggle-title" aria-label="Gitbranch" aria-controls="gitbranch-devstatus" aria-expanded="false" resolved="">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
								<g fill="none" fill-rule="evenodd">
									<path d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z" fill="#344563">
									</path>
								</g>
							</svg>
						</button>
						<h4 class="toggle-title" id="gitbranch-devstatus-label">
							Copy git checkout command
						</h4>
						<ul class="ops"></ul>
					</div>
					<div class="mod-content">
						<div class="message-container">
						<div class="field-group">
							<label for="browser-extension-gitbranch__select">
								Type <span class="visually-hidden">Required</span>
								<span class="aui-icon icon-required" aria-hidden="true"></span>
							</label>
							<select id="browser-extension-gitbranch__select" class="aui-button" onchange="updateCommand(this.value)">
								<option hidden disabled value>Please select</option>
								${prefixesSelectOptions()}
							</select>
						</div>
								
							</div>
							<div class="flex-container space-between form">
								<form class="aui">
									<input id="browser-extension-gitbranch__input" class="text long-field" readonly="readonly" value="${setBranchName('feature')}">
								</form>
								<div>
									<button class="aui-button" onclick="copyCommand()">
										<span class="aui-icon aui-icon-small aui-iconfont-copy icon-copy"></span> Copy
									</button>
								</div>
							</table>
						</div>
					</div>
				</div>`;

				containerElement.insertAdjacentHTML("afterend", pimmContainer)
            }
        }, 100);
    }
}
