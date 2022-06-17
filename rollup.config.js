import replace from 'rollup-plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/blockcerts-verifier/index.js',
    output: [
      {
        file: 'dist/main.js',
        format: 'iife',
        name: 'BlockcertsVerifier',
        inlineDynamicImports: true
      }
    ],
    plugins: [
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      typescript(),
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
        name: 'BlockcertsVerifier',
        inlineDynamicImports: true
      }
    ],
    plugins: [
      commonjs({
        include: 'node_modules/**'
      }),
      typescript(),
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
