const path = require('path');

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
          presets:["env", "react", "es2015", "stage-0"]
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
  devServer: {
    contentBase: path.join(__dirname, "views/public"),
    compress: true,
    port: 9000
  }
}
