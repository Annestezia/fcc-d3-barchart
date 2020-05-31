export default {
    input: './index.js',
    output: {
        file: './bundle.js',
        format: 'iife',
        name: 'bundle',
        globals: {
          'd3':'d3'  
        },
        external: ['d3']
    }
}