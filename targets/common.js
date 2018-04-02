import babel from 'rollup-plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import uglify from 'rollup-plugin-uglify';

// Setting up all plugins
export default [

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
];