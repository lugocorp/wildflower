const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
        'wildflower': path.join(__dirname, 'wildflower')
    }
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'index.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'www')
    }
  }
};