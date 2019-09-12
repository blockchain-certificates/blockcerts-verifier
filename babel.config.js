module.exports = api => {
  const isJestTestEnv = api.env('test');
  let config = {};

  if (isJestTestEnv) {
    config = {
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true
          }
        ]
      ],
      plugins: ['@babel/transform-runtime']
    };
  }

  return config;
};
