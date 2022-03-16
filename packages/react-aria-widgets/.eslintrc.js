module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	ignorePatterns: ['.git', '.yarn', 'dist'],
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:storybook/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 13,
		sourceType: 'module'
	},
	plugins: ['react'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
		indent: ['error', 'tab', {
			SwitchCase: 1
		}],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-unused-vars': ['error', {
			varsIgnorePattern: '[iI]gnored',
			argsIgnorePattern: '[iI]gnored'
		}],
		'array-callback-return': ['warn'],
		'no-await-in-loop': ['warn'],
		'no-constructor-return': ['error'],
		'no-promise-executor-return': ['error'],
		'no-self-compare': ['error'],
		'no-unused-private-class-members': ['error'],
		camelcase: ['error'],
		curly: ['error', 'multi-or-nest'],
		'default-case-last': ['error'],
		'default-param-last': ['error'],
		'dot-notation': ['error'],
		eqeqeq: ['error', 'always'],
		'func-name-matching': ['error'],
		'func-names': ['error', 'as-needed'],
		'guard-for-in': ['warn'],
		'new-cap': ['error'],
		'no-alert': ['warn'],
		'no-array-constructor': ['error'],
		'no-caller': ['error'],
		'no-console': ['error'],
		'no-eval': ['error'],
		'no-extend-native': ['error'],
		'no-floating-decimal': ['error'],
		'no-implicit-coercion': ['error'],
		'no-implied-eval': ['error'],
		'no-mixed-operators': ['warn'],
		'no-multi-assign': ['error'],
		'no-negated-condition': ['warn'],
		'no-new-func': ['error'],
		'no-new-object': ['error'],
		'no-new-wrappers': ['error'],
		'no-return-assign': ['error'],
		'no-return-await': ['warn'],
		'no-script-url': ['error'],
		'no-throw-literal': ['error'],
		'no-unused-expressions': ['error', {
			enforceForJSX: true
		}],
		'no-useless-call': ['error'],
		'no-useless-computed-key': ['error'],
		'no-useless-constructor': ['error'],
		'no-useless-rename': ['error'],
		'no-useless-return': ['error'],
		'no-var': ['error'],
		'one-var': ['error', 'never'],
		'prefer-const': ['error'],
		'prefer-promise-reject-errors': ['error'],
		'prefer-regex-literals': ['error'],
		'prefer-rest-params': ['error'],
		'quote-props': ['error', 'as-needed'],
		radix: ['error'],
		'require-await': ['error'],
		'require-unicode-regexp': ['error'],
		'array-bracket-newline': ['error', 'consistent'],
		'array-bracket-spacing': ['error', 'always', {
			objectsInArrays: false
		}],
		'array-element-newline': ['error', 'consistent'],
		'arrow-spacing': ['error'],
		'block-spacing': ['error'],
		'brace-style': ['error', 'stroustrup'],
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'only-multiline'
		}],
		'comma-spacing': ['error'],
		'comma-style': ['error'],
		'computed-property-spacing': ['error'],
		'dot-location': ['error'],
		'eol-last': ['error', 'always'],
		'func-call-spacing': ['error'],
		'function-call-argument-newline': ['error', 'consistent'],
		'function-paren-newline': ['error', 'consistent'],
		'implicit-arrow-linebreak': ['error'],
		'jsx-quotes': ['error', 'prefer-double'],
		'key-spacing': ['error'],
		'keyword-spacing': ['error', {
			overrides: {
				if: {
					after: false
				},
				for: {
					after: false
				},
				while: {
					after: false
				},
				switch: {
					after: false
				}
			}
		}],
		'new-parens': ['error', 'always'],
		'no-multi-spaces': ['error'],
		'no-multiple-empty-lines': ['error', {
			max: 1,
			maxEOF: 0
		}],
		'no-trailing-spaces': ['error'],
		'no-whitespace-before-property': ['error'],
		'nonblock-statement-body-position': ['error', 'below'],
		'object-curly-newline': ['error', {
			consistent: true
		}],
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': ['error', {
			allowAllPropertiesOnSameLine: true
		}],
		'operator-linebreak': ['error', 'before'],
		'padded-blocks': ['error', 'never'],
		'rest-spread-spacing': ['error', 'never'],
		'semi-spacing': ['error', {
			before: false,
			after: true
		}],
		'semi-style': ['error', 'last'],
		'space-before-blocks': ['error', 'always'],
		'space-before-function-paren': ['error', 'never'],
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': ['error'],
		'space-unary-ops': ['error', {
			words: true,
			nonwords: false
		}],
		'switch-colon-spacing': ['error', {
			after: true,
			before: false
		}],
		'template-curly-spacing': ['error', 'never'],
		'react/button-has-type': ['error'],
		'react/destructuring-assignment': ['error', 'always'],
		'react/default-props-match-prop-types': ['error'],
		'react/function-component-definition': ['error', {
			namedComponents: 'function-declaration',
			unnamedComponents: 'function-expression' //Linter prevents using array syntax though it's allowed

		}],
		'react/no-access-state-in-setstate': ['error'],
		'react/no-adjacent-inline-elements': ['warn'],
		'react/no-array-index-key': ['warn'],
		'react/no-arrow-function-lifecycle': ['error'],
		'react/no-danger': ['warn'],
		'react/no-did-mount-set-state': ['error'],
		'react/no-did-update-set-state': ['error'],
		'react/no-invalid-html-attribute': ['error'],
		'react/no-redundant-should-component-update': ['error'],
		'react/no-this-in-sfc': ['error'],
		'react/no-typos': ['error'],
		'react/no-unstable-nested-components': ['error'],
		'react/no-unused-class-component-methods': ['error'],
		'react/no-unused-prop-types': ['error'],
		'react/no-unused-state': ['error'],
		'react/no-will-update-set-state': ['error'],
		'react/prefer-es6-class': ['error', 'always'],
		'react/prefer-stateless-function': ['error'],
		'react/require-default-props': ['error', {
			forbidDefaultForRequired: true
		}],
		'react/self-closing-comp': ['error'],
		'react/sort-comp': ['error', {
			order: ['static-variables', 'static-methods', 'lifecycle', '/^on.+$/u', 'rendering', 'everything-else'],
			groups: {
				rendering: ['render', '/^render.+$/u']
			}
		}],
		'react/state-in-constructor': ['error', 'always'],
		'react/static-property-placement': ['error', 'static public field'],
		'react/style-prop-object': ['error'],
		'react/void-dom-elements-no-children': ['error'],
		'react/jsx-boolean-value': ['error', 'never'],
		'react/jsx-child-element-spacing': ['warn'],
		'react/jsx-closing-tag-location': ['error'],
		'react/jsx-curly-brace-presence': ['error', 'never'],
		'react/jsx-curly-newline': ['error', 'consistent'],
		'react/jsx-curly-spacing': ['error', {
			when: 'always',
			children: true,
			spacing: {
				objectLiterals: 'never'
			}
		}],
		'react/jsx-equals-spacing': ['error'],
		'react/jsx-filename-extension': ['error'],
		'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
		'react/jsx-handler-names': ['error', {
			eventHandlerPrefix: 'on'
		}],
		'react/jsx-indent': ['error', 'tab', {
			indentLogicalExpressions: true
		}],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-newline': ['error', {
			prevent: true
		}],
		'react/jsx-no-bind': ['error'],
		'react/jsx-no-useless-fragment': ['error'],
		'react/jsx-one-expression-per-line': ['error', {
			allow: 'single-child'
		}],
		'react/jsx-pascal-case': ['error'],
		'react/jsx-props-no-multi-spaces': ['error'],
		'react/jsx-props-no-spreading': ['error'],
		'react/jsx-tag-spacing': ['error', {
			beforeClosing: 'never'
		}],
		'react/jsx-wrap-multilines': ['error', {
			declaration: 'parens-new-line',
			assignment: 'parens-new-line',
			return: 'parens-new-line',
			arrow: 'parens-new-line'
		}]
	}
};