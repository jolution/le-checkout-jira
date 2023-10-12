import config from "./config.js";

import {getTranslation} from './language.js';
import {insertAfter, logThis} from "./utils.js";

const TRANSLATION = getTranslation();

// check and limit the maximum length of text
function checkMaxLength(text) {
    return text.length > 255 ? text.slice(0, 255) : text;
}

// approve a valid git branch name
function approveValidGitBranchName(branchName) {
    // Ersetze ungültige Zeichen durch Leerzeichen
    const sanitizedBranchName = branchName.replace(/[^a-zA-Z0-9\/\-_]/g, '');

    // Überprüfe die maximale Länge
    return checkMaxLength(sanitizedBranchName);
}

// if (window.location.href.startsWith(CONFIG.TARGET_URL)) {
//     logThis(`URL starts with ${CONFIG.TARGET_URL}`);

// window.onload = function () {
window.addEventListener('load', function () {
    logThis('Page fully loaded');
    let TRYS = 0;
    let issueNumber = null;
    const waitForJIRA = setInterval(function () {
        logThis('Checking for JIRA...');

        if (TRYS > config.ABORT_ON_TRYS) {
            clearInterval(waitForJIRA);
            logThis('JIRA not available');
            return;
        }

        if (typeof JIRA !== 'undefined' && typeof JIRA.Issue !== 'undefined' && typeof JIRA.Issue.getIssueKey === 'function') {

            // Get JIRA issue Key
            if (JIRA.Issue.getIssueId() !== null) {
                issueNumber = JIRA.Issue.getIssueKey();
            } else {
                const currentUrl = window.location.href;

                const jiraIdMatch = currentUrl.match(/\/browse\/([A-Z0-9]+-\d+)/);

                if (jiraIdMatch) {
                    issueNumber = jiraIdMatch[1];
                } else {
                    clearInterval(waitForJIRA);
                    logThis('JIRA KEY not available');
                    return;
                }
            }

            clearInterval(waitForJIRA);
            logThis('JIRA is available');

            document.addEventListener("DOMContentLoaded", function () {
                document.querySelector('body').classList.add('browser-extension-gitbranch');
            });

            // TODO: extract to separate function like "getIssueTitle"
            // TODO: maybe extract different selector for jira on premise and cloud
            // Extracting the title
            let titleElement = document.getElementById('summary-val');

            // If the element is not reachable, use the alternative ID (Jira Cloud, next gen)
            if (!titleElement) {
                titleElement = document.querySelector('h1');

                // TODO: exact target doesnt work
                // titleElement = document.querySelector('h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]');
            }

            const title = titleElement?.textContent.trim();

            const typeElement = document.getElementById("type-val");

            // Creating the container element
            const containerElement = document.createElement('div');
            containerElement.id = 'browser-extension-gitbranch__container';

            // Selecting the target for the input field (Jira on promise)
            let devStatusPanel = document.getElementById('viewissue-devstatus-panel');

            // If the element is not reachable, use the alternative ID (Jira Cloud, next gen)
            if (!devStatusPanel) {
                // Wenn das Element nicht erreichbar ist, verwenden Sie die alternative ID
                devStatusPanel = document.getElementById('jira-issue-header-actions');
            }

            // devStatusPanel.appendChild(containerElement);
            insertAfter(containerElement, devStatusPanel);

            /**
             * Generate Option list from defined prefixes
             * @author Jochen Simon <jochen.simon@atos.net>
             * @returns {string} Option fields
             */
            window.prefixesSelectOptions = () => {
                let options = '';
                if (config.BRANCH_PREFIXES) {
                    for (const prefix of Object.keys(config.BRANCH_PREFIXES)) {
                        const emoji = config.BRANCH_PREFIXES[prefix];
                        // "Bug" is the bug type identifier name in Jira for both languages (DE,EN)
                        options += `<option value="${prefix}" ${(prefix === 'fix' && typeElement?.textContent.trim() === "Bug") ? "selected" : ""} onclick="updateGitCommand()">${emoji} ${prefix}</option>`;
                    }
                }
                return options;
            };

            /**
             * Updates the input field value with git checkout command
             * @author Julian Kasimir <julian.kasimir@atos.net>
             * @author Jochen Simon <jochen.simon@atos.net>
             * @param {string} prefix
             */
            window.updateGitCommand = (prefix) => {
                const elem = document.getElementById('browser-extension-gitbranch__input');
                elem.value = setGitCommand(prefix);
            }

            /**
             * @author Julian Kasimir <julian.kasimir@atos.net>
             * @author Jochen Simon <jochen.simon@atos.net>
             * Copy the content of the input field
             */
            window.copyGitCommand = () => {
                const elem = document.getElementById('browser-extension-gitbranch__input');
                elem.select();
                document.execCommand('copy');
            }

            /**
             * Format page title to fit GitHub branch name and add the prefix parameter
             * @author Julian Kasimir <julian.kasimir@atos.net>
             * @author Jochen Simon <jochen.simon@atos.net>
             * @param {string} prefix
             * @returns {string} formatted branch name
             */
            window.getBranchName = (prefix) => {

                if (!title) {
                    return '';
                }

                const formattedBranchName = approveValidGitBranchName(`${title?.toLowerCase().replace(/\s+/g, '-')}`);
                return `${prefix}/${issueNumber}-${formattedBranchName}`;
            }

            /**
             * Set the git checkout command
             * @author Julian Kasimir <julian.kasimir@atos.net>
             * @author Jochen Simon <jochen.simon@atos.net>
             * @param {string} prefix
             * @returns {string} formatted GitHub command
             */
            window.setGitCommand = (prefix) => {
                const branch = getBranchName(prefix);
                return `git checkout -b ${branch}`;
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
									<input id="browser-extension-gitbranch__input" class="text long-field" readonly="readonly" value="${setGitCommand(typeElement?.textContent.trim() === "Bug" ? 'fix' : 'feature')}">
								</form>
								<div class="ml-1">
									<button class="aui-button" onclick="copyGitCommand()">
									    <!-- TODO: icon only work on jira on promise -->
										<span class="aui-icon aui-icon-small aui-iconfont-copy icon-copy"></span> ${TRANSLATION.COPY_BUTTON_TEXT}
									</button>
								</div>
							</table>
						</div>
					</div>
				</div>`;

            containerElement.insertAdjacentHTML("afterend", container)
        } else {
            TRYS++;
        }
    }, 100);
}, false);
