module.exports = api => {
  const isJestTestEnv = api.env('test');
  let config = {};

  if (isJestTestEnv) {
    config = {
      presets: [['@babel/env', {
        loose: true
      }]],
      plugins: [['@babel/transform-runtime', {
        helpers: false
      }]]
    };
  }

  return config;
};
