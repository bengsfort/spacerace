import babel from 'rollup-plugin-babel';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'cjs'
  },
  plugins: [ babel({
    exclude: 'node_modules/**'
  })]
};