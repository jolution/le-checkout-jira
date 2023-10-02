const TRANSLATION = {
    en: {
        COPY_GIT_COMMAND: "Copy git checkout command",
        SELECT_PROMPT: "Please select",
        COPY_BUTTON_TEXT: "Copy",
        TYPE: "Type",
        REQUIRED: "Required",
    },
    de: {
        COPY_GIT_COMMAND: "Git checkout Befehl kopieren",
        SELECT_PROMPT: "Bitte auswählen",
        COPY_BUTTON_TEXT: "Kopieren",
        TYPE: "Art",
        REQUIRED: "Erforderlich"
    },
};

export function getTranslation() {
    return TRANSLATION[document.documentElement.lang || 'en'];
}
