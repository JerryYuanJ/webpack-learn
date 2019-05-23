const path = require('path')
const webpack = require('webpack')

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