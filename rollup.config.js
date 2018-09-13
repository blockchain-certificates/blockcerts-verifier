import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/blockcerts-verifier/index.js',
  output: [
    {
      file: 'dist/main.js',
      format: 'iife',
      name: 'BlockcertsVerifier'
    }
  ],
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/env', {
        modules: false,
        'targets': {
          'node': 'current'
        }
      }]],
      plugins: ['@babel/plugin-proposal-object-rest-spread']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    terser()
  ]
};
