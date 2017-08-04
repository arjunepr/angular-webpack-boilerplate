const devConfig = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.styl$/, use: ['style-loader', 'css-loader', 'stylus-loader'] },
    ]
  },

  devServer: {
    contentBase: join(__dirname, "dist"),
    // publicPath: '/',
    compress: true,
    port: 8080,
    historyApiFallback: true
  },

  entry: {
    server: "webpack-dev-server/client?http://localhost:8080/"
  },
};

module.exports = devConfig;