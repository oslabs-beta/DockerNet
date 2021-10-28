const path = require('path');
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    src: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // allows for omission of file extensions when importing
  },

  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'build'),
    },
    port: process.env.FRONTEND_PORT,
    proxy: {
      '/networks': `http://localhost:${process.env.SERVER_PORT}/`,
      '/api': `http://localhost:${process.env.SERVER_PORT}/`,
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
