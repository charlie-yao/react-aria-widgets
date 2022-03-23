const path = require('path');
const { SCSS_LOADER } = require('./webpack.common.js');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	resolve: {
		extensions: [ '.js', '.json', '.jsx' ],
		alias: {
			src: path.resolve(__dirname, 'src/'),
		},
	},
	entry: {
		index: {
			import: './src/index.jsx',
		},
		accordion: {
			import: './src/Accordion/index.js',
		},
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		library: {
			name: '[name]',
			type: 'umd',
		},
	},
	externals: {
		react: 'react',
	},
	optimization: {
		usedExports: true,
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
			SCSS_LOADER,
		],
	},
};
