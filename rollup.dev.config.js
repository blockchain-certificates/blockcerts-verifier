import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import livereload from 'rollup-plugin-livereload';

const BUILD_OUTPUT_FOLDER = 'dev';

export default [
  {
    input: 'src/blockcerts-verifier/index.js',
    output: [
      {
        file: `${BUILD_OUTPUT_FOLDER}/index.js`,
        format: 'iife',
        name: 'BlockcertsVerifier'
      }
    ],
    plugins: [
      typescript(),
      resolve({
        browser: true,
        preferBuiltins: true
      }),
      serve({
        contentBase: [BUILD_OUTPUT_FOLDER, 'demo', 'node_modules', 'dist', 'test/fixtures'],
        host: '0.0.0.0',
        port: 8081,
        open: true
      }),
      livereload({
        watch: BUILD_OUTPUT_FOLDER
      })
    ]
  }
];
