import babel from 'rollup-plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve'

//region Plugin setup

// Setting up all plugins
let plugins = [

  // Transpiles ES6 to current JS
  babel({
    exclude: 'node_modules/**'
  }),

  // Generates an html file and injects the JS bundle
  htmlTemplate({
    template: 'src/template.html',
    target: 'index.html'
  }),

  // Minifies the JS bundle
  uglify()
]

// Start a server if not in production build
if (process.env.BUILD == "dev") {
  plugins.push(serve({
    open: true,
    contentBase: ['dist']
  }));
}

//endregion


//region Output setup

// Setting up the output object
let out = {
  file: 'dist/bundle.js',
  format: 'cjs'
}

// Add sourcemaps if not in production build
if (process.env.BUILD == "dev") {
  out.sourcemap = true;
}

//endregion

export default {
  // The entry module
  input: 'src/js/main.js',

  // Setting the output object
  output: out,

  // Passing the plugins array
  plugins: plugins,

  // Watch setup
  watch: {
    chokidar : true,
    include: 'src/**',
    exclude: 'node_modules/**',
    clearScreen: true
  }
};