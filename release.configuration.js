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
          transform: (commit, context) => {
            console.log("commit is............", commit);
            if (typeof commit.hash === "string") {
              commit.shortHash = commit.hash.substring(0, 7);
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
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};

module.exports = config;
