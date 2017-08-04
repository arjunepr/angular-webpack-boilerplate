const webpack = require('webpack');
const process = require('process');
const Merge = require('webpack-merge');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const helpersLoc = join(__dirname, 'helpers');

const helpers = require(helpersLoc);

const { join } = require('path');

commonConfig = {
  entry: {
    polyfills: join(__dirname, 'src', 'polyfills.ts'),
    vendor: join(__dirname, 'src', 'vendor.ts'),
    app: join(__dirname, 'src', 'app.ts'),
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
      { test: /\.ts$/i, use: ['ts-loader', 'angular2-template-loader'] },

      { test: /\.html$/i, use: ['html-loader'] },

      {
        test: /\.(woff|woff2|ttf|eot|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash].[ext]'
            }
          }
        ]
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {

              mozjpeg: {

                progressive: true,

              },

              gifsicle: {

                interlaced: false,

              },

              optipng: {

                optimizationLevel: 4,

              },

              pngquant: {

                quality: '65-70',

                speed: 3,

              },


            }
          }
        ]
      },

    ]
  },

  plugins: [
    new FriendlyErrorsPlugin(),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};


module.exports = commonConfig;
