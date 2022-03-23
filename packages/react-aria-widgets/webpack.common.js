module.exports = {
	SCSS_LOADER: {
		test: /\.scss$/u,
		use: [ 'style-loader', 'css-loader', 'sass-loader' ],
	},
};
