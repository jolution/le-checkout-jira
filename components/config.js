// TODO: Add more log levels
/*
  INFO: 1,
  VERBOSE: 2,
  WARNING: 3,
  ERROR: 4
  */
const LOG_LEVEL = {
  NONE: 0,
  ALL: 1,
};

const BRANCH_PREFIXES = {
  feature: '🍕',
  fix: '🐛',
  docs: '📝',
  style: '✨',
  refactor: '🔨',
  build: '🤖',
  ci: '🔁',
  perf: '⚡',
  test: '✅',
  chore: '📦',
  research: '🔍',
};

const CONFIG = {
  LOG_LEVEL: LOG_LEVEL.NONE,
  LOG_IDENTIFIER: '[LE_CHECKOUT]',
  ABORT_ON_TRYS: 25,
  BRANCH_PREFIXES: BRANCH_PREFIXES,
  EMOJI: false,
};

export default CONFIG;
