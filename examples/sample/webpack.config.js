var path = require('path');
module.exports = {
  entry: {
  	app:['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath:"/build/",
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ["env", {"modules": false}], "stage-2", 'react'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file-loader',
          query: {
              name: 'assets/img/[name].[ext]'
          }
      }
    ]
  }
};
