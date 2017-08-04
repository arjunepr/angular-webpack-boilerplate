const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { join } = require('path');

const locTree = {
  dist: join(__dirname, '..', 'dist')
}

const devConfig = {
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    port: 8080,
    historyApiFallback: true,
    stats: 'minimal'
  },

  entry: {
    server: "webpack-dev-server/client?http://localhost:8080/"
  },

  output: {
    path: locTree.dist,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};

module.exports = devConfig;