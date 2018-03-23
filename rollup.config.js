import babel from 'rollup-plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve'

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
    }),
    uglify(),
    serve({
      open: true,
      contentBase: ['dist']
    })
  ],
  watch: {
    chokidar : true,
    include: 'src/**',
    exclude: 'node_modules/**',
    clearScreen: true
  }
};