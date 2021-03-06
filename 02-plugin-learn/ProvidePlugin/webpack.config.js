const path = require('path')
const webpack = require('./node_modules/_webpack@4.32.2@webpack/lib/webpack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            my: path.resolve(path.join(__dirname, 'src/my-module.js')),
            diff: ['lodash', 'difference'],
        })
    ]
}