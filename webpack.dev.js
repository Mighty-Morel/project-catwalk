const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
});
