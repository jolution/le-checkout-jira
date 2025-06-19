![Banner](https://github.com/jolution/le-checkout-jira/blob/main/resources/png/le-checkout-social-banner-big.png)

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./resources/png/le-checkout-dark.png">
        <source media="(prefers-color-scheme: light)" srcset="./resources/png/le-checkout-light.png">
        <img alt="Shows the banner of Le Checkout, with its logo" src="./resources/png/le-checkout-dark.png" width="300">
    </picture>
</p>

<div align="center">

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

</div>

# LeCheckout for Jira

_Gitbranch Generator Browser Extension_

**Working Draft / PoC**

## 📚 Summary

This is a Chrome browser extension that generates a git branch name based on the current jira issue key and the issue
summary.

:package: If you use GitHub, have a look at the alpha Test-Version of [GitHub Version](https://github.com/jolution/le-checkout-github).

## 🌟 Screenshots

![App Screenshot 1](resources/png/screenshot.png)

![App Screenshot 2](resources/png/screenshot2.png)

## 📦 Installation

### 🛒 Chrome and Firefox Store

You can install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/dlnckhalkgolbmdjengopemhjihfcgde) or [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/lecheckout-jira).

We recommend using the store versions for the best experience, as they are automatically updated and maintained.

**✨⭐️ Like the extension? Give it a ⭐️⭐️⭐️⭐️⭐️ review — we’d love your support! ✨**

<p>
  <a href="https://chromewebstore.google.com/detail/dlnckhalkgolbmdjengopemhjihfcgde">
    <picture>
      <source srcset="https://i.imgur.com/XBIE9pk.png" media="(prefers-color-scheme: dark)" />
      <img height="58" src="https://i.imgur.com/oGxig2F.png" alt="Chrome Web Store" />
    </picture>
  </a>
  <a href="https://addons.mozilla.org/addon/lecheckout-jira">
    <picture>
      <source srcset="https://i.imgur.com/ZluoP7T.png" media="(prefers-color-scheme: dark)" />
      <img height="58" src="https://i.imgur.com/4PobQqE.png" alt="Firefox Add-ons" />
    </picture>
  </a>
</p>

### 📦 Installation from Source for Development

1. Download the latest release with GitHub CLI:
   `gh repo clone jolution/le-checkout-jira`
2. Navigate into the project directory and build the extension:
   ```bash
   npm install && npm run build
   ```
3. Open the Extension Management page by navigating to `chrome://extensions`.
4. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
5. Click the **LOAD UNPACKED** button and select the extension directory named `dist`.
6. Open a new tab and open the company jira on promise ticket directly. On the right sidebar you will find the extension.

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
<summary>Why do we "need" this Extension?</summary>
<p>In Jira, you can set up Development integration such as GitHub, if configured correctly by someone with permissions. This integration allows us to create branches directly. However, the native setup lacks the ability to easily select a prefix like `/feature/` or `/fix/`. Our extension is designed for users who do not have this feature enabled natively or who prefer to use specific prefixes.</p>
<p>Additionally, our extension aims to automatically prefill the prefix based on the type of Jira ticket in the future, distinguishing between bugs and features, for added convenience.</p>
</details>

<details>
<summary>Why do you include the Jira ID in the branch title?</summary>
<p>This allows us to make assignments more easily and, among other things, work with jira-prepare-commit-msg in projects.</p>
</details>

For more questions and answers, please visit
our [Q&A Discussions](https://github.com/jolution/le-checkout-jira/discussions/categories/q-a).

## ❤️ Support

If you find this project helpful, please consider giving it a star
on [GitHub](https://github.com/jolution/le-checkout-jira).

[![Star this repository](https://img.shields.io/github/stars/jolution/le-checkout-jira?style=social)](https://github.com/jolution/le-checkout-jira)

And of course, if you like the extension, please consider giving it a ⭐️⭐️⭐️⭐️⭐️ review on the [Chrome Web Store](https://chromewebstore.google.com/detail/lecheckout-jira/dlnckhalkgolbmdjengopemhjihfcgde/reviews) or [Firefox Add-ons page](https://addons.mozilla.org/addon/lecheckout-jira).

**The extension must be installed before you can leave a review.**

---

We do not currently offer direct support for this project, please use the [Discussions](https://github.com/jolution/le-checkout-jira/discussions)
or [Issues](https://github.com/jolution/le-checkout-jira/issues) section for any questions or issues you may have.

## 🗺️ Roadmap

### 🔄 Shared Library: Unifying LeCheckout for Jira & GitHub

We’re currently working on extracting a **shared library** to unify the core logic of [LeCheckout for Jira](https://github.com/jolution/le-checkout-jira) and [LeCheckout for GitHub](https://github.com/jolution/le-checkout-github). This step will help us streamline development, reduce duplication, and ensure consistent behavior across both extensions.
Once the shared library is in place, the **GitHub version** will be updated to match the improved logic already available in the **Jira version**.

### 🚀 Upcoming Features

- [x] Logo and CI design
- [x] Rollout to Chrome Web Store
- [x] Firefox extension version in Firefox Add-ons


- [ ] Subtask handling (in Progress 🚀)
- [ ] Design the popup Component
- [ ] Shared library for LeCheckout for Jira and GitHub
- [ ] Custom title inputs (Community request)
- [ ] Add Azure DevOps support
- [ ] Optimized design for Jira On-Premise and Jira Cloud
- [ ] Integration into the popup variant of the ticket
- [ ] Setup option to toggle emojis
- [ ] Setup option to hide specific branch prefixes
- [ ] Add GitLab support

### ⚙️ Tech Stack Upgrade: Preparing for v2.0

The current codebase is more of a PoC (proof of concept), and while it served us well to validate the idea, we’re now preparing for a more robust and scalable **2.0 release**.

For this next version, we plan to rebuild the extensions using a **modern frontend framework** — like **[Preact](https://preactjs.com/)** — to improve maintainability, performance, and developer experience.

This will allow us to:

- Streamline the UI and make it more modular
- Set a solid foundation for cross-platform extension development

We’re excited about what’s ahead!

## ✍️ Authors (in alphabetical order)

- [@juliankasimir](https://www.github.com/juliankasimir)
- [@pimmok](https://www.github.com/pimmok)

## 💎 Sponsor (in alphabetical order)

### Atos & Eviden

We are grateful for the support from [Atos](https://atos.net) and [Eviden](https://eviden.com), which enables us to continue our open source work.

<div style="display: flex; gap: 20px; align-items: center;">
  <img style="max-width: 100px;" width="100" src="https://raw.githubusercontent.com/DE-AMS-AD-VAPPS/brand/refs/heads/main/assets/atos_logo--blue.svg" alt="Atos logo">
  <img style="max-width: 100px;" width="100" src="https://raw.githubusercontent.com/DE-AMS-AD-VAPPS/brand/main/assets/eviden-logo.svg" alt="Eviden logo">
</div>

### JetBrains

Many thanks to [JetBrains](https://jetbrains.com), which provided us two times with a yearly license for all their programs for
the open source work on this project.

<img style="max-width: 50px" width="50" src="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.png" alt="WebStorm logo">

## ⚖️ License

See the [LICENSE](LICENSE) file for details.

## ℹ️ Disclaimer

**LeCheckout** is an independent open-source project and is not affiliated with, endorsed by, or associated with Atlassian®, Jira®, or any of their subsidiaries or products.  
All references to Jira® are for descriptive and interoperability purposes only.

The visual style and logo of LeCheckout are inspired by the *Monkey Island* franchise. This project is not affiliated with, endorsed by, or associated with *Monkey Island*, Lucasfilm™, LucasArts™, Disney®, or any related entities. All trademarks and copyrights are the property of their respective owners.

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
      <td align="center" valign="top" width="14.28%"><a href="http://dikka.dev"><img src="https://avatars.githubusercontent.com/u/64754924?v=4?s=100" width="100px;" alt="Raik Rohde"/><br /><sub><b>Raik Rohde</b></sub></a><br /><a href="#ideas-Sett17" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raj19joshi"><img src="https://avatars.githubusercontent.com/u/112689625?v=4?s=100" width="100px;" alt="raj19joshi"/><br /><sub><b>raj19joshi</b></sub></a><br /><a href="https://github.com/jolution/le-checkout-jira/commits?author=raj19joshi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tobi-he"><img src="https://avatars.githubusercontent.com/u/129895563?v=4?s=100" width="100px;" alt="tobi-he"/><br /><sub><b>tobi-he</b></sub></a><br /><a href="#maintenance-tobi-he" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!
