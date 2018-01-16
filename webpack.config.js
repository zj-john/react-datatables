var path = require('path');
module.exports = {
  entry: {
  	app:['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js',
    publicPath:"/lib/",
  },
  module: {
    loaders:[
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/
        ],
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
  },
  resolve: {
      alias: {
        'MediaRoot': path.resolve(__dirname, './src/media')
      }
  },
};
