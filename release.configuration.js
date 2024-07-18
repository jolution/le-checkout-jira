const config = {
    $schema: "https://json.schemastore.org/semantic-release.json",
    branches: ["main"],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "conventionalcommits",
                releaseRules: [
                    {
                        type: "build",
                        scope: "deps",
                        release: "patch",
                    },
                ],
            },
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "conventionalcommits",
                presetConfig: {
                    types: [
                        { type: "feat", section: "Features" },
                        { type: "fix", section: "Bug Fixes" },
                        { type: "chore", hidden: true },
                        { type: "docs", section: "Documentation" },
                        { type: "style", section: "Styling" },
                        { type: "refactor", hidden: true },
                        { type: "perf", section: "Performance" },
                        { type: "test", section: "Test" },
                        {
                            type: "build",
                            section: "Dependencies and Other Build Updates",
                            hidden: false,
                        },
                    ],
                },
                writerOpts: {
                    transform: (commit) => {
                        // console.log("commit is............", commit);
                        if (typeof commit.hash === "string") {
                            commit.shortHash = commit.hash.substring(0, 7);
                        }
                        if (commit.subject) {
                            const gitHubBaseUrl = "https://github.com/jolution/le-checkout-jira";
                            // console.log("commit subject..............", commit.subject);
                            const issues = commit.subject.match(/\[([A-Z]+-\d+)]/g);
                            // console.log("Issues..............", issues);
                            if (issues) {
                                // remove curly braces from issue key
                                const issueKey = issues[0].substring(1, issues[0].length - 1);

                                // set commit subject to include link to Jira issue
                                const issueWithLink = `[${issueKey}](${gitHubBaseUrl}/browse/${issueKey})`;

                                // remove issue key from commit subject
                                const text = commit.subject.split(issues[0])[1].trim();

                                // set commit subject to include link to Jira issue
                                commit.subject = `${issueWithLink} ${text}`;
                            }
                        }
                        return commit;
                    },
                },
            },
        ],
        "@semantic-release/changelog",
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                assets: ["CHANGELOG.md", "package.json", "package-lock.json"],
                message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
        "@semantic-release/github",
    ],
};

module.exports = config;
