import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'sanitizer/index.js',
  name: 'Sanitizer',
  output: [
    {
      file: 'sanitizer/sanitizer.js',
      format: 'es'
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
