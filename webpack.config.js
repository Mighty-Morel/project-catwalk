const path = require('path');

const source = path.join(__dirname, 'client', 'src', 'index.jsx');
const destination = path.join(__dirname, 'public');

module.exports = {
  entry: source,
  output: {
    path: destination,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // use: ['style-loader', {
        //   loader: 'css-loader',
        //   options: {
        //     modules: true,
        //   },
        // }],
      },
    ],
  },
  mode: 'development',
  devtool: 'eval-source-map',
};
