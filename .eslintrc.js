module.exports = {
	'root': true,
	'parser': '@babel/eslint-parser',
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
		'array-callback-return': [
			'warn',
		],
		'no-await-in-loop': [
			'warn',
		],
		'no-constructor-return': [
			'error',
		],
		'no-promise-executor-return': [
			'error',
		],
		'no-self-compare': [
			'error',
		],
		'no-unused-private-class-members': [
			'error',
		],
		'camelcase': [
			'error',
		],
		'capitalized-comments': [
			'error',
			'always',
			{
				'ignoreInlineComments': true,
				'ignoreConsecutiveComments': true,
			},
		],
		'curly': [
			'error',
			'multi-or-nest',
		],
		'default-case-last': [
			'error',
		],
		'default-param-last': [
			'error',
		],
		'dot-notation': [
			'error',
		],
		'eqeqeq': [
			'error',
			'always',
		],
		'func-name-matching': [
			'error',
		],
		'func-names': [
			'error',
			'as-needed',
		],
		'guard-for-in': [
			'warn',
		],
		'new-cap': [
			'error',
		],
		'no-alert': [
			'warn',
		],
		'no-array-constructor': [
			'error'
		],
		'no-caller': [
			'error',
		],
		'no-console': [
			'error',
		],
		'no-eval': [
			'error',
		],
		'no-extend-native': [
			'error',
		],
		'no-floating-decimal': [
			'error',
		],
		'no-implicit-coercion': [
			'error',
		],
		'no-implied-eval': [
			'error',
		],
		'no-mixed-operators': [
			'warn',
		],
		'no-multi-assign': [
			'error',
		],
		'no-negated-condition': [
			'warn',
		],
		'no-new-func': [
			'error',
		],
		'no-new-object': [
			'error',
		],
		'no-new-wrappers': [
			'error',
		],
		'no-return-assign': [
			'error',
		],
		'no-return-await': [
			'warn',
		],
		'no-script-url': [
			'error',
		],
		'no-throw-literal': [
			'error'
		],
		'no-unused-expressions': [
			'error',
			{
				'enforceForJSX': true,
			},
		],
		'no-useless-call': [
			'error',
		],
		'no-useless-computed-key': [
			'error',
		],
		'no-useless-constructor': [
			'error',
		],
		'no-useless-rename': [
			'error',
		],
		'no-useless-return': [
			'error',
		],
		'no-var': [
			'error',
		],
		'one-var': [
			'error',
			'never',
		],
		'prefer-const': [
			'error',
		],
		'prefer-promise-reject-errors': [
			'error',
		],
		'prefer-regex-literals': [
			'error',
		],
		'prefer-rest-params': [
			'error',
		],
		'quote-props': [
			'error',
			'as-needed',
		],
		'radix': [
			'error',
		],
		'require-await': [
			'error',
		],
		'require-unicode-regexp': [
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
