import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'sanitizer/index.js',
  name: 'Sanitizer',
  output: [
    {
      file: 'sanitizer/sanitizer.js',
      format: 'es',
      banner: '/**\n * @warning\n *\n * THIS IS AN AUTO GENERATED FILE. IF YOU WISH TO WHITELIST PROPERTIES / TAGS, PLEASE DO IT SO IN sanitizer/index.js \n *\n * More Information: https://github.com/blockchain-certificates/blockcerts-verifier#modifying-the-sanitizer\n **/\n'
    }
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs({
      namedExports: {
        xss: ['xss'],
        cssfilter: ['cssfilter']
      }
    })
  ]
};
