module.exports = {
	'root': true,
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 13,
		'sourceType': 'module',
	},
	'plugins': [
		'react',
	],
	'rules': {
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1,
			},
		],
		'linebreak-style': [
			'error',
			'unix',
		],
		'quotes': [
			'error',
			'single',
		],
		'semi': [
			'error',
			'always',
		],
		'eqeqeq': [
			'error',
			'always',
		],
		'no-console': [
			'error',
		],
		'comma-dangle': [
			'error',
			'always-multiline',
		],
		'eol-last': [
			'error',
			'always',
		],
		'jsx-quotes': [
			'error',
			'prefer-double',
		],
		'no-multiple-empty-lines': [
			'error',
			{
				'max': 1,
				'maxEOF': 0,
			},
		],
		'no-trailing-spaces': [
			'error',
		],
	}
};
