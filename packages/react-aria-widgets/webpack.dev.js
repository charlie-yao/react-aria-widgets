const { merge } = require('webpack-merge');

//Misc.
const { cjsConfig, esmConfig, commonConfig } = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    usedExports: true,
  },
};

const cjsDevConfig = merge(cjsConfig, commonConfig, devConfig);
const esmDevConfig = merge(esmConfig, commonConfig, devConfig);

module.exports = [
  cjsDevConfig,
  esmDevConfig,
];
