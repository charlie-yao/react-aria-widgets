const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	resolve: {
		extensions: [ '.js', '.json', '.jsx' ],
		alias: {
			src: path.resolve(__dirname, 'src/'),
		},
	},
	entry: {
		index: {
			import: './src/index.jsx',
			dependOn: 'vendor',
		},
		vendor: [ 'react', 'react-dom', 'prop-types' ],
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/u,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
					},
				},
			},
			{
				test: /\.jsx$/u,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
					},
				},
			},
			{
				test: /\.css$/u,
				use: [ 'style-loader', 'css-loader' ],
			},
			{
				test: /\.scss$/u,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello world!',
			template: 'template.html',
		}),
	],
};
