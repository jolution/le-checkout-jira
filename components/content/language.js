import * as TRANSLATION from './translation.json' assert {type: 'json'};

export function getTranslation() {
    const lang = document.documentElement.lang || 'en';
    const translation = TRANSLATION?.default[lang];

    return translation ? translation : `[No translation available for ${lang}]`;
}
