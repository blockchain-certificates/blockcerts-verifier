import replace from 'rollup-plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
  }
];
