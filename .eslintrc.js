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
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
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
		'react/button-has-type': [
			'error',
		],
		'react/default-props-match-prop-types': [
			'error',
		],
		'react/no-access-state-in-setstate': [
			'error',
		],
		'react/require-default-props': [
			'error',
			{
				'forbidDefaultForRequired': true,
			},
		],
		'react/void-dom-elements-no-children': [
			'error',
		],
		'react/jsx-child-element-spacing': [
			'error',
		],
		'react/jsx-closing-tag-location': [
			'error',
		],
		'react/jsx-curly-brace-presence': [
			'error',
			'never',
		],
		'react/jsx-curly-newline': [
			'error',
			'consistent'
		],
		'react/jsx-curly-spacing': [
			'error',
			{
				'when': 'always',
				'children': true,
				'spacing': {
					'objectLiterals': 'never',
				},
			},
		],
		'react/jsx-equals-spacing': [
			'error'
		],
		'react/jsx-filename-extension': [
			'error',
			{
				'allow': 'as-needed',
			},
		],
		'react/jsx-indent': [
			'error',
			'tab',
			{
				'indentLogicalExpressions': true,
			},
		],
		'react/jsx-no-bind': [
			'error',
		],
		'react/jsx-no-useless-fragment': [
			'error',
		],
		'react/jsx-pascal-case': [
			'error',
		],
		'react/jsx-props-no-spreading': [
			'error',
		],
		'react/jsx-tag-spacing': [
			'error',
			{
				'beforeClosing': 'never',
			},
		],
		'react/jsx-wrap-multilines': [
			'error',
			{
				'declaration': 'parens-new-line',
				'assignment': 'parens-new-line',
				'return': 'parens-new-line',
				'arrow': 'parens-new-line',
			},
		],
	}
};
