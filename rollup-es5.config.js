import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/blockcerts-universal-verifier/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'iife',
      name: 'BlockcertsUniversalVerifier'
    }
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    })
  ]
};
