const { merge } = require('webpack-merge');

//Misc.
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	optimization: {
		usedExports: true,
	},
	devServer: {
		static: './dist',
	},
});
