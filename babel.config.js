module.exports = api => {
  const isJestTestEnv = api.env('test');
  let config = {};

  if (isJestTestEnv) {
    config = {
      presets: [['@babel/env', {
        targets: {
          ie: '11'
        },
        debug: false
      }]],
      plugins: [['@babel/transform-runtime', {
        helpers: false
      }]]
    };
  }

  return config;
};
