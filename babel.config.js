module.exports = {
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
