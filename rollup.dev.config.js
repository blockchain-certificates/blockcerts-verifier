import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';

const BUILD_OUTPUT_FOLDER = 'dev';

export default [
  {
    input: 'src/blockcerts-verifier/index.js',
    output: [
      {
        file: `${BUILD_OUTPUT_FOLDER}/index.js`,
        format: 'iife',
        name: 'BlockcertsVerifier',
        inlineDynamicImports: true
      }
    ],
    plugins: [
      commonjs(),
      typescript(),
      resolve({
        browser: true,
        preferBuiltins: true
      }),
      serve({
        contentBase: [BUILD_OUTPUT_FOLDER, 'demo', 'node_modules', 'dist', 'test/fixtures'],
        host: '0.0.0.0',
        port: 8081,
        open: true,
        https: {
          cert: fs.readFileSync(`${BUILD_OUTPUT_FOLDER}/https-cert/cert.pem`),
          key: fs.readFileSync(`${BUILD_OUTPUT_FOLDER}/https-cert/key.pem`)
        }
      }),
      livereload({
        watch: BUILD_OUTPUT_FOLDER
      })
    ]
  }
];
