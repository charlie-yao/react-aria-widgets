const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /\.yarn/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					},
				},
			},
			{
				test: /\.jsx$/,
				exclude: /\.yarn/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello world!',
		}),
	],
};
