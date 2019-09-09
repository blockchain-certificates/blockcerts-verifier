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
      babel({
        babelrc: false,
        presets: [['env', {
          modules: false,
          targets: {
            node: 'current'
          }
        }]],
        plugins: ['transform-object-rest-spread', 'external-helpers']
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
        presets: [['env', {
          modules: false,
          targets: {
            browser: 'IE 11'
          }
        }]],
        plugins: ['transform-object-rest-spread', 'external-helpers', ['transform-runtime', {
          helpers: false,
          polyfill: false
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
