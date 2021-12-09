/**
 * Creates a custom React prop type.
 *
 * The inspiration behind this is that this allows
 * marking props with a custom validator as required.
 *
 * This also circumvents an issue with eslint-plugin-react
 * as the rule react/require-default-props will complain
 * if it encounters a custom prop validator.
 * normally cannot mark them as required.
 *
 * See:
 * https://github.com/yannickcr/eslint-plugin-react/issues/1020
 * https://github.com/facebook/react/issues/9125#issuecomment-285531461
 *
 * @param {function} customPropValidator
 * @param {boolean} [isRequired=false]
 * @returns {Error}
 */
export function createCustomPropType(customPropValidator, isRequired = false) {
	return function(props, propName, componentName) {
		const prop = props[propName}

		if(isRequired && (prop === null || prop === undefined)) {
			return new Error(`${propName} is a required prop.`);
		}
		else
			return customPropValidator(props, propName, componentName);
	}
}
