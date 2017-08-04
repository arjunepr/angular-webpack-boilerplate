const { join } = require('path');
const process = require('process');

const locTree = {
  common: join(__dirname, 'config', 'webpack.common.js'),
  prod: join(__dirname, 'config', 'webpack.prod.js'),
  dev: join(__dirname, 'config', 'webpack.dev.js')
};

const commonConfig = require(locTree.common);
const prodConfig = require(locTree.prod);
const devConfig = require(locTree.dev);

module.exports = (process.env.NODE_ENV === 'development' ? Merge(commonConfig, devConfig) : Merge(commonConfig, prodConfig));
