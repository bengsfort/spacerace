import plugins from "./common";
import gzip from "rollup-plugin-gzip";

export default {
    // The entry module
    input: 'src/js/main.js',
  
    // Setting the output object
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
  
    // Passing the plugins array
    plugins: plugins.concat([
        // GZip compression
        gzip()
    ])
};