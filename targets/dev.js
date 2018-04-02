import plugins from "./common";
import serve from 'rollup-plugin-serve';
import livereload from "rollup-plugin-livereload";

export default {
    // The entry module
    input: 'src/js/main.js',
    
    // Setting the output object
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
        sourcemap: true
    },
    
    // Passing the plugins array
    plugins: plugins.concat([
        // Starts a server and opens browser window
        serve({
            open: true,
            contentBase: ['dist']
        }),
    
        // Starts livereload service
        livereload()
    ]),
    
    // Watch setup
    watch: {
        chokidar : true,
        include: 'src/**',
        exclude: 'node_modules/**',
        clearScreen: false
    }
};