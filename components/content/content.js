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

                // Creating radio buttons
                const radioContainer = document.createElement('div');
                const prefixes = ['feature', 'fix', 'build', 'ci', 'docs', 'perf', 'refactor', 'style', 'test', 'chore', 'research'];

                // TODO: set option to popup.js (not existed yet), you can ask @juliankasimir for add popup base code
                // Radio Option only interesting for projects with small amount of prefixes
                if (displayPrefixesType === DisplayPrefixesType.RADIO) {
                    prefixes.forEach(prefix => {
                        const radioId = `radio-${prefix}`;

                        const radio = document.createElement('input');
                        radio.type = 'radio';
                        radio.name = 'branch-prefix';
                        radio.id = radioId;
                        radio.value = prefix;
                        radio.checked = prefix === 'feature';
                        radio.addEventListener('change', () => {
                            updateBranchName(prefix);
                        });

                        const label = document.createElement('label');
                        label.textContent = prefix;
                        label.htmlFor = radioId; // Link the label to the radio button

                        radioContainer.appendChild(radio);
                        radioContainer.appendChild(label);
                    });
                } else if (displayPrefixesType === DisplayPrefixesType.SELECT) {

                    const select = document.createElement('select');
                    select.addEventListener('change', () => {
                        updateBranchName(select.value);
                    });

                    prefixes.forEach(prefix => {
                        const option = document.createElement('option');
                        option.value = prefix;
                        option.textContent = prefix;

                        // TODO: @raj please preselect the option based on the Jira Issue Type ID
                        // option.selected = prefix === 'feature';

                        select.appendChild(option);
                    });

                    radioContainer.appendChild(select);
                }

                // Formatting the branch name
                // TODO: duplicate code, please outsource to function 1/2
                const formattedBranchName = approveValidGitBranchName(`${title.toLowerCase().replace(/\s+/g, '-')}`);
                const formattedBranchNameWithPrefix = `feature/${issueNumber}-${formattedBranchName}`;

                // Creating the input field with the formatted branch name
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.readOnly = true;
                inputElement.className = 'text aui-ss-field ajs-dirty-warning-exempt active';
                inputElement.value = `git checkout -b ${formattedBranchNameWithPrefix}`;

                // TODO: outsource to css file
                inputElement.style.width = '82%';

                // Function to update the branch name based on the selected prefix
                function updateBranchName(prefix) {
                    // TODO: duplicate code, please outsource to function 2/2
                    const formattedBranchName = approveValidGitBranchName(`${title.toLowerCase().replace(/\s+/g, '-')}`);
                    const formattedBranchNameWithPrefix = `${prefix}/${issueNumber}-${formattedBranchName}`;

                    inputElement.value = `git checkout -b ${formattedBranchNameWithPrefix}`;
                }

                // Creating the "Copy" button
                const copyButton = document.createElement('button');
                copyButton.innerHTML = '<span class="aui-icon aui-icon-small aui-iconfont-copy icon-copy"></span>';
                copyButton.className = 'aui-button';
                copyButton.addEventListener('click', () => {
                    inputElement.select();
                    document.execCommand('copy');
                });

                // TODO: outsource to css file
                copyButton.style.width = '15%';
                copyButton.style.marginLeft = '1%';

                // Creating the container element
                const containerElement = document.createElement('div');
                containerElement.id = 'browser-extension-gitbranch__container';

                const containerElementHeadline = document.createElement('h4');
                containerElementHeadline.className = 'toggle-title';
                containerElementHeadline.appendChild(document.createTextNode('Branch Name:'));
                containerElement.appendChild(containerElementHeadline);

                // TODO: optimate the layout @jochensimon
                // Maybe we could have something like:
                // [SELECTBOX] / [INPUT] [COPY BUTTON]
                // without "git checkout -b" in the input field ?

                containerElement.appendChild(inputElement);
                containerElement.appendChild(copyButton);
                containerElement.appendChild(radioContainer);

                // Selecting the target for the input field and adding the input field
                const devStatusPanel = document.getElementById('viewissue-devstatus-panel');
                // devStatusPanel.appendChild(containerElement);
                insertAfter(containerElement, devStatusPanel);






				// @pimmok implmentation
				// Creating the container element
                const pimmContainerElement = document.createElement('div');
                pimmContainerElement.id = 'gitbranch-devstatus';
				pimmContainerElement.className = 'module toggle-wrap collapsed';

				const pimmContainerElementHeader = document.createElement('div');
                pimmContainerElementHeader.className = 'toggle-title';
                pimmContainerElementHeader.appendChild(document.createTextNode('Branch Name:'));
                pimmContainerElement.appendChild(pimmContainerElementHeader);

				function pimmPrefixesSelectOptions() {
					let options = ''
					if(prefixes) {
						for(const prefix of prefixes) {
							options += `<option value="${prefix}" ${(prefix === 'feature') ? "selected" : ""}>${prefix}</option>`
						}
					}
					return options
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
							Gitbranch
						</h4>
						<ul class="ops"></ul>
					</div>
					<div class="mod-content">
						<div class="message-container">
							<select>
								<option hidden disabled value>Please select</option>
								${pimmPrefixesSelectOptions()}
							</select>
						</div>
					</div>
				</div>`;

				containerElement.insertAdjacentHTML("afterend", pimmContainer)
				// insertAfter(pimmContainer, containerElement);
            }
        }, 100);
    }
}
