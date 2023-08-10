const { merge } = require('webpack-merge');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');

//Misc.
const { cjsConfig, esmConfig, commonConfig } = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      '...',
      new CSSMinimizerPlugin(),
    ],
  },
};

const cjsProdConfig = merge(cjsConfig, commonConfig, prodConfig);
const esmProdConfig = merge(esmConfig, commonConfig, prodConfig);

module.exports = [
  cjsProdConfig,
  esmProdConfig,
];
