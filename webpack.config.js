const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: './views/src/js/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'views/public/js')
  },
  plugins: [
    new MinifyPlugin(true, { test: /\.js$/ })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};
