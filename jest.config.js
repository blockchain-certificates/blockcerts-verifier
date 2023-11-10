module.exports = {
  testEnvironment: 'jsdom',
  modulePaths: [
    '<rootDir>/src/',
    '<rootDir>/node_modules'
  ],
  setupFiles: [
    'jest-canvas-mock',
    './test/setupJest.ts'
  ],
  transform: {
    '^.+\\.((j|t)s)$': 'ts-jest'
  },
  testPathIgnorePatterns: [
    './test/e2e',
    '<rootDir>/node_modules'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@polymer|lit-html|pwa-helpers|@blockcerts/cert-verifier-js)/)'
  ],
  moduleNameMapper: {
    sinon: '<rootDir>/node_modules/sinon/pkg/sinon.js',
  },
  globals: {
    TextEncoder: require('util').TextEncoder,
    TextDecoder: require('util').TextDecoder
  }
};
