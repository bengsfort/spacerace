import babel from 'rollup-plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    htmlTemplate({
      template: 'src/template.html',
      target: 'index.html'
    })
  ]
};