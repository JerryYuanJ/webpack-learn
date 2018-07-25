const path = require('path')

module.exports = {
    entry: './src/hello.js',
    output: {
        filename: 'hello.js',
        path: path.resolve(__dirname, 'dist')
    }
}