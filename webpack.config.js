const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.js', '.json', '.jsx'],
		alias: {
			src: path.resolve(__dirname, 'src/'),
		},
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
				test: /\.js$/u,
				exclude: /\.yarn/u,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.jsx$/u,
				exclude: /\.yarn/u,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/u,
				exclude: /\.yarn/u,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/u,
				exclude: /\.yarn/u,
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
