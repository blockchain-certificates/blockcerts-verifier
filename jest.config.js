module.exports = {
  modulePaths: [
    '<rootDir>/src/',
    '<rootDir>/node_modules'
  ],
  setupFiles: [
    'jest-canvas-mock',
    './test/setupJest.js'
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    './test/e2e',
    '<rootDir>/node_modules'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@polymer|lit-html|pwa-helpers|@blockcerts/cert-verifier-js)/)'
  ]
};
