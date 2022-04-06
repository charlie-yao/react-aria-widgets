const { merge } = require('webpack-merge');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');

//Misc.
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimizer: [
			'...',
			new CSSMinimizerPlugin(),
		],
	},
});
