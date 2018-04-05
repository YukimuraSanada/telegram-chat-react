const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ANALYZE = process.env.NODE_ENV == 'analyze';
const pluginsArr = ANALYZE ? [new BundleAnalyzerPlugin()] : [];

module.exports = {

  entry: ['babel-polyfill', "./views/src/App.jsx"],
  output:{
    path: path.resolve(__dirname, 'views/public'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css','.scss'],
    alias: {
      'src': path.join(__dirname, 'views/src'),
      'Components' : path.join(__dirname, 'views/src/Components'),
    }
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
  plugins: pluginsArr,
  devServer: {
    contentBase: path.join(__dirname, "views/public"),
    compress: true,
    port: 9000
  }
}
