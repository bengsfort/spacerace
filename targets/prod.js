import plugins from "./common";
import gzip from "rollup-plugin-gzip";

plugins.push(
    // GZip compression
    gzip()
);

export default {
    // The entry module
    input: 'src/js/main.js',
  
    // Setting the output object
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
  
    // Passing the plugins array
    plugins: plugins
};