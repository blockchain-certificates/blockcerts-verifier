import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/blockcerts-universal-verifier/index.js',
  output: [
    {
      file: 'dist/buv-iife.js',
      format: 'iife',
      name: 'BlockcertsUniversalVerifier'
    }
  ],
  plugins: [
    babel({
      babelrc: false,
      presets: [['env', { modules: false }]],
      plugins: ['external-helpers', 'transform-object-rest-spread']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    })
  ]
};
