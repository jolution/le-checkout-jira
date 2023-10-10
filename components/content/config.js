const LOG_LEVEL = {
    NONE: 0,
    ALL: 1,

    // TODO: Add more log levels
    /*
    INFO: 1,
    VERBOSE: 2,
    WARNING: 3,
    ERROR: 4
    */
};

const BRANCH_PREFIXES = {
    'feature': '🍕',
    'fix': '🐛',
    'docs': '📝',
    'style': '🎨',
    'refactor': '🔨',
    'build': '🤖️',
    'ci': '🔁',
    'perf': '⚡',
    'test': '✅',
    'chore': '📦',
    'research': '🔍'
};

const CONFIG = {
    LOG_LEVEL: LOG_LEVEL.NONE,
    LOG_IDENTIFIER: '[EVIDEN_STC5]',
    BRANCH_PREFIXES: BRANCH_PREFIXES
};

export default CONFIG;
