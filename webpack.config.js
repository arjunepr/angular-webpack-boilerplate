const { join } = require('path');
const process = require('process');

const loc = {
  common: join(__dirname, 'config', 'webpack.common.js'),
  prod: join(__dirname, 'config', 'webpack.prod.js'),
  dev: join(__dirname, 'config', 'webpack.dev.js')
};

const commonConfig = require(loc.common);
const prodConfig = require(loc.prod);
const devConfig = require(loc.dev);

module.exports = (process.env.NODE_ENV === 'development' ? Merge(commonConfig, devConfig) : Merge(commonConfig, prodConfig));
