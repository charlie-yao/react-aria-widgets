import PropTypes from 'prop-types';

/**
 * Creates a custom React prop type.
 *
 * The inspiration behind this is that this allows
 * marking props with a custom validator as required.
 *
 * This also circumvents an issue with eslint-plugin-react
 * as the rule react/require-default-props will complain
 * if it encounters a custom prop validator as they
 * normally cannot be marked as required.
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
	return function customPropType(props, propName, componentName) {
		const prop = props[propName];

		if(isRequired && (prop === null || prop === undefined))
			return new Error(`${propName} is a required prop.`);
		else
			return customPropValidator(props, propName, componentName);
	};
}

/**
 * Because HTML only allows <h1> to <h6>, complain if
 * an invalid headerLevel prop gets passed in.
 *
 * @param {Object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {Error}
 */
function _validateHeaderLevelProp(props, propName) {
	const headerLevel = props[propName];

	if(!Number.isInteger(headerLevel) || headerLevel < 1 || headerLevel > 6)
		return new Error(`${propName} must be an integer between 1 and 6 (inclusive).`);
}

const validateHeaderLevelProp = createCustomPropType(_validateHeaderLevelProp);
validateHeaderLevelProp.isRequired = createCustomPropType(_validateHeaderLevelProp, true);
export { validateHeaderLevelProp };

export const MENU_ITEM_PROPTYPE = PropTypes.shape({
	type: PropTypes.oneOf([
		'menuitem',
		'parentmenuitem',
		'menuitemcheckbox',
		'menuitemradio',
		'separator',
	]).isRequired,
	node: PropTypes.node.isRequired,
	children: MENU_ITEMS_PROPTYPE, //Only relevant to "parentmenuitem"
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]), //Only relevant to parentmenuitem" or "separator"
	label: PropTypes.string, //Only relevant to "parentmenuitem"
	labelId: PropTypes.string, //Only relevant to "parentmenuitem"
	isDisabled: PropTypes.bool,
});

export const MENU_ITEMS_PROPTYPE = PropTypes.arrayOf(MENU_ITEM_PROPTYPE);
