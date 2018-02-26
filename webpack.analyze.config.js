const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {

    entry: ['babel-polyfill', "./views/src/Client.jsx"],
    output:{
      path: path.resolve(__dirname, 'views/public'),
      publicPath: '/',
      filename: "bundle.js"
    },
    module:{
      rules:[
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          options:{
            presets:["env", "react", "es2015", "stage-0"],
            "plugins": [
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
            ]
          }
        },
        {
          test: /\.css$|\.scss$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        }
      ]
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, "views/public"),
      compress: true,
      port: 9000
    }
}
