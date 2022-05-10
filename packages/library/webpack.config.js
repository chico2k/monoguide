/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: path.join(__dirname, 'index.ts'),
  devtool: 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts', 'js'],
    symlinks: false,
    cacheWithContext: false
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  target: 'node',
  optimization: {
    minimize: false
  },

  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.webpack')
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  }
};
