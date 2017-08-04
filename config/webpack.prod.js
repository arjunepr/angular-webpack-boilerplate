const webpack = require('webpack');

const { join } = require('path');

const locTree = {
  dist: join(__dirname, '..', 'dist')
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylusAutoprefixer = require('autoprefixer-stylus');


const prodConfig = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: { loader: 'style-loader' },

          use: ['css-loader', 'stylus-loader']
        })
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: { loader: 'style-loader' },

          use: ['css-loader']
        })
      },
    ]
  },

  output: {
    path: locTree.dist,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      },
      mangle: {
        keep_fnames: true
      }
    }),

    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        default: {
          use: [stylusAutoprefixer({ browsers: ['last 4 versions'] })],
        },
      },
    }),

    new ExtractTextPlugin('[name].[hash].css'),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),

    new webpack.optimize.AggressiveMergingPlugin()
  ]
};

module.exports = prodConfig;