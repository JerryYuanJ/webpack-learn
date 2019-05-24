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
        new webpack.DefinePlugin({
            ppp: '"Papa"',
            jerry: JSON.stringify('jerry'),
            'process.env.NODE_ENV': '"WHAT"',
            two: '1+1',
            print: 'console.info'
        })
    ]
}