const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.js', '.json', '.jsx'],
	},
	entry: './src/index.jsx',
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
			{
				test: /\.css$/,
				exclude: /\.yarn/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				exclude: /\.yarn/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello world!',
			template: 'template.html',
		}),
	],
	devServer: {
		static: './dist',
	},
};
