const webpack = require('webpack');

const Merge = require('webpack-merge');

const { join } = require('path');

commonConfig = {
  entry: {
    app: join(__dirname, 'src', 'app.ts'),
    vendor: join(__dirname, 'src', 'vendor.ts')
  },

  output: {
    filename: '[name].js'
  },

  resolve: {
    // Just so we don't have to ALWAYS specify the extension.
    extensions: ['.js', '.json', '.ts', '.html', '.css', '.styl']
  },

  node: {
    // There's a certain issue with node when trying to use webpack...
    // This prevents that.
    // Putting it here for your sanity.
    fs: 'empty'
  },

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.ts$/, use: ['ts-loader'] },
      { test: /\.styl$/, use: ['style-loader', 'css-loader', 'stylus-loader'] },
    ]
  }
};

module.exports = commonConfig;