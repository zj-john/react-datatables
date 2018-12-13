const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry:'./src/index.js',
  output:{
      filename: "bundle.js",
      path: path.resolve(__dirname, './dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015',{ modules: false }],
                ['stage-2']
              ]
          }
        }

      ], exclude: /node_modules/ },
      { test:/\.css$/,use:['style-loader','css-loader']},
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ]
}
