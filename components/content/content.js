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
const LogLevels = 1;
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

                // TODO: may we remove the radio buttons and only use the select box?
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

                // TODO: @raj please preselect the option based on the Jira Issue Type ID
                // const IssueType = document.getElementById("issuetype-field")?.value;
                const typeElement = document.getElementById("type-val");
                if (typeElement) {
                    const taskText = typeElement.textContent.trim();
                    logThis(taskText);
                    if (taskText === "Task") {
                        // radio select "feature" as default
                    }
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
            }
        }, 100);
    }
}
