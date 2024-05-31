[//]: # (<p align="center">)
[//]: # (    <img alt="Shows the banner of LeCheckout Jira, with its logo" src="./resources/svg/lecheckout.svg" width="700">)
[//]: # (</p>)

<div align="center">

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

</div>

# LeCheckout for Jira

_Gitbranch Generator Browser Extension_

**Working Draft**

## 📚 Summary

This is a Chrome browser extension that generates a git branch name based on the current jira issue key and the issue
summary.

:package: If you use GitHub, have a look at the [GitHub Version](https://github.com/jolution/le-checkout-github).

## 🌟 Screenshots

EN:

![App Screenshot EN](screenshot.png)

DE:

![App Screenshot DE](screenshot2.png)

FR:

![App Screenshot FR](screenshot3.png)

## 📦 Installation

### Chrome

1. Download the latest release with GitHub CLI:
   `gh repo clone jolution/le-checkout-jira`
2. Open the Extension Management page by navigating to `chrome://extensions`.
3. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
4. Click the **LOAD UNPACKED** button and select the extension directory.
5. Open a new tab and open the company jira on promise ticket directly. On the right sidebar you will find the
   extension.

## Updating

### Chrome

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Click the **Update** button.

## ✨Features

Why Use this Extension?

- Direct integration of the Jira ID
- Avoid typos in ID
- Avoid omitting the prefix
- Quick setup using copy and paste

## ❓FAQ

<details>
<summary>Why do you include the Jira ID in the branch title?</summary>
<p>This allows us to make assignments more easily and, among other things, work with jira-prepare-commit-msg in projects.</p>
</details>

For more questions and answers, please visit our [Q&A Discussions](https://github.com/jolution/le-checkout-jira/discussions/categories/q-a).

## ❤️ Support

If you find this project helpful, please consider giving it a star on [GitHub](https://github.com/jolution/le-checkout-jira).

[![Star this repository](https://img.shields.io/github/stars/jolution/le-checkout-jira?style=social)](https://github.com/jolution/le-checkout-jira)

We do not currently offer direct support for this project.

## 🗺️ Roadmap

- Logo and CI design
- Optimized design for Jira On Premise and Jira Cloud
- Integration into popup variant of the ticket
- Setup option for toggle the emojis.
- Setup option to hide some of the prefix branches
- Rolling out to Chrome Store
- Creating the extension for Firefox

### ✍️ Authors (in alphabetical order)

- [@juliankasimir](https://www.github.com/juliankasimir)
- [@pimmok](https://www.github.com/pimmok)

## 💎 Sponsor

Many thanks to JetBrains, which provided us with a yearly license for all their programs for the open source work on this project.

<img style="max-width: 50px" width="50" src="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.png" alt="WebStorm logo.">

## ⚖️ License

See the [LICENSE](LICENSE) file for details.

## ℹ️ Disclaimer

Please note that this project, LeCheckout, is not officially associated with or endorsed by the Monkey Island franchise, its creators, or any related entities. It is an independent project developed by the open-source community and does not claim any rights to the Monkey Island trademark or any related materials.

## ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://jochensimon.com/"><img src="https://avatars.githubusercontent.com/u/17846993?v=4?s=100" width="100px;" alt="Jochen Simon"/><br /><sub><b>Jochen Simon</b></sub></a><br /><a href="#design-pimmok" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/juliankasimir"><img src="https://avatars.githubusercontent.com/u/120172350?v=4?s=100" width="100px;" alt="Julian Kasimir"/><br /><sub><b>Julian Kasimir</b></sub></a><br /><a href="#ideas-juliankasimir" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/jolution/le-checkout-jira/commits?author=juliankasimir" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
