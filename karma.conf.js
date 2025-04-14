/* eslint-disable @typescript-eslint/no-require-imports */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: config.grep ? config.grep : 'test/e2e/*.test.js', type: 'module', nocache: true }
      ],

      browsers: ['FirefoxHeadless'], // Chrome from default config

      esm: {
        nodeResolve: true
      },
      listenAddress: '::' // https://github.com/karma-runner/karma/issues/3730#issuecomment-1122075632
      // you can overwrite/extend the config further
    })
  );
  return config;
};
