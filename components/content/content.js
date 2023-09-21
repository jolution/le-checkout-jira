function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const targetURL = 'https://jira.fsc.atos-services.net/browse/';

const LogLevels = 1;
const LogIdentifier = '[JOLUTION]';

function logThis(message) {
    if (LogLevels > 0) {
        // eslint-disable-next-line no-console
        console.log(`${LogIdentifier} ${message}`);
    }
}

if (window.location.href.startsWith(targetURL)) {
    logThis(`Url starts with ${targetURL}`);

    window.onload = function() {
        logThis('Page fully loaded');
        const waitForJIRA = setInterval(function() {
            logThis('Checking for JIRA...');
            if (typeof JIRA !== 'undefined' && typeof JIRA.Issue !== 'undefined' && typeof JIRA.Issue.getIssueKey === 'function') {
                clearInterval(waitForJIRA);
                logThis('JIRA is available');

                const issueNumber = JIRA.Issue.getIssueKey();

                // Extrahieren des Titels
                const titleElement = document.getElementById('summary-val');
                const title = titleElement.textContent.trim();

                // Erstellen von Radio-Buttons
                const radioContainer = document.createElement('div');
                const prefixes = ['feature', 'hotfix', 'bugfix', 'release', 'support', 'test', 'task'];

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
                    label.htmlFor = radioId; // Verknüpfe das Label mit der Radio-Box

                    radioContainer.appendChild(radio);
                    radioContainer.appendChild(label);
                });

                // Formatieren des Branch-Namens
                const formattedBranchName = `feature/${issueNumber}-${title.toLowerCase().replace(/\s+/g, '-')}`;

                // Erstellen des Eingabefelds mit dem formatierten Branch-Namen
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.readOnly = true;
                inputElement.className = 'text aui-ss-field ajs-dirty-warning-exempt active';
                inputElement.value = `git checkout -b ${formattedBranchName}`;
                inputElement.style.width = '82%';

                // Funktion zur Aktualisierung des Branch-Namens basierend auf dem ausgewählten Prefix
                function updateBranchName(prefix) {
                    const formattedBranchName = `${prefix + '/'}${issueNumber}-${title.toLowerCase().replace(/\s+/g, '-')}`;
                    inputElement.value = `git checkout -b ${formattedBranchName}`;
                }

                // Erstellen des "Copy"-Buttons
                const copyButton = document.createElement('button');
                copyButton.innerHTML = '<span class="aui-icon aui-icon-small aui-iconfont-copy icon-copy"></span>';
                copyButton.style.width = '15%';
                copyButton.style.marginLeft = '1%';
                copyButton.className = 'aui-button';
                copyButton.addEventListener('click', () => {
                    inputElement.select();
                    document.execCommand('copy');
                });

                // Erstellen des Container-Elements
                const containerElement = document.createElement('div');
                containerElement.appendChild(inputElement);
                containerElement.appendChild(copyButton);
                containerElement.appendChild(radioContainer);

                // Auswählen des Ziels für das Eingabefeld und Hinzufügen des Eingabefelds
                const devStatusPanel = document.getElementById('viewissue-devstatus-panel');
                // devStatusPanel.appendChild(containerElement);
                insertAfter(containerElement, devStatusPanel);
            }
        }, 100);
    }
}
