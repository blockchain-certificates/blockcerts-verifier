import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/blockcerts-verifier/index.js',
    output: [
      {
        file: 'dist/main.js',
        format: 'iife',
        name: 'BlockcertsVerifier'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      resolve({
        browser: true,
        preferBuiltins: true
      })// ,
      // terser()
    ]
  },
  {
    input: 'src/blockcerts-verifier/index.js',
    output: [
      {
        file: 'dist/ie11.js',
        format: 'iife',
        name: 'BlockcertsVerifier'
      }
    ],
    plugins: [
      cjs({
        include: 'node_modules/**'
      }),
      babel({
        babelrc: false,
        presets: [['@babel/env', {
          targets: {
            ie: '11'
          },
          debug: false
        }]],
        plugins: [['@babel/transform-runtime', {
          helpers: false
        }]]
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
  }
];
