const { merge } = require('webpack-merge');

//Misc.
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
	mode: 'production',
	devtool: 'source-map',
});
