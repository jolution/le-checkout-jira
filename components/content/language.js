import TRANSLATION_CONTENT from "/components/content/translation.js";

function getTranslation() {
    const lang = document.documentElement.lang || "en";
    const translation = TRANSLATION_CONTENT[lang];

    return translation ? translation : `[No translation available for ${lang}]`;
}

const TRANSLATION = getTranslation();

export default TRANSLATION;
