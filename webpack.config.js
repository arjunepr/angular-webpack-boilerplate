const webpack = require('webpack');
const process = require('process');
const Merge = require('webpack-merge');

const stylusAutoprefixer = require('autoprefixer-stylus');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

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
  },

  plugins: [
    new FriendlyErrorsPlugin()
  ]
};

const devConfig = {

};

const prodConfig = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      }
    }),

    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        default: {
          use: [stylusAutoprefixer({ browsers: ['last 4 versions']})],
        },
      },
    }),

    new ExtractTextPlugin('style.css'),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.AggressiveMergingPlugin()
  ]
};

module.exports = (process.env.NODE_ENV === 'development' ? Merge(commonConfig, devConfig) : Merge(commonConfig, prodConfig));
