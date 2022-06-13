module.exports = api => {
  const isJestTestEnv = api.env('test');
  let config = {};

  if (isJestTestEnv) {
    config = {
      presets: [[
        '@babel/env',
        {
          targets: {
            node: '10'
          },
          debug: false,
          useBuiltIns: 'usage',
          corejs: 3,
          shippedProposals: true
        }
      ]],
      plugins: [['@babel/transform-runtime', {
        helpers: false
      }]]
    };
  }

  return config;
};
