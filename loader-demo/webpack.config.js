const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'hello.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.list.tmpl.js/,
        use: [
          {
            loader: path.resolve('./loader/list-tmpl-loader-1.js'),
            options: { name: "Jerry" }
          },
          {
            loader: path.resolve('./loader/list-tmpl-loader-2.js'),
            options: { major: "Software" }
          }
        ]
      }
    ]
  }
}