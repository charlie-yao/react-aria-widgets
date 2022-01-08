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

export const MENUITEM_PROPTYPE = PropTypes.shape({
	type: PropTypes.oneOf([ 'item' ]).isRequired,
	node: PropTypes.node.isRequired,
	//onKeyDown: PropTypes.func.isRequired, //TODO "onActivate"? who "owns" the event?
	isDisabled: PropTypes.bool,
});

export const PARENT_MENUITEM_PROPTYPE = PropTypes.shape({
	type: PropTypes.oneOf([ 'menu' ]).isRequired,
	node: PropTypes.node.isRequired,
	children: MENUITEMS_PROPTYPE,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
	label: PropTypes.string,
	labelId: PropTypes.string,
	isDisabled: PropTypes.bool,
});

export const MENUITEM_CHECKBOX_PROPTYPE = PropTypes.shape({
	type: PropTypes.oneOf([ 'checkbox' ]).isRequired,
	node: PropTypes.node.isRequired,
	//onKeyDown: PropTypes.func.isRequired, //TODO "onActivate"? who "owns" the event?
	isDisabled: PropTypes.bool,
	isChecked: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf([ 'true', 'false', 'mixed' ]),
	]),
});

export const MENUITEM_RADIOGROUP_PROPTYPE = PropTypes.shape({
	type: PropTypes.oneOf([ 'radiogroup' ]).isRequired,
	children: PropTypes.arrayOf(PropTypes.shape({
		node: PropTypes.node.isRequired,
		//onKeyDown: PropTypes.func.isRequired, //TODO "onActivate"? who "owns" the event?
		isDisabled: PropTypes.bool,
		isChecked: PropTypes.bool,
	})).isRequired,
	label: PropTypes.string,
	labelId: PropTypes.string,
	//TODO default checked index?
	//TODO function to automatically handle which radio is checked?
});

export const MENUITEM_SEPARATOR_PROPTYPE = PropTypes.shape({
	type: PropTypes.oneOf([ 'separator' ]).isRequired,
	node: PropTypes.node,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
});

export const MENUITEMS_PROPTYPE = PropTypes.arrayOf(PropTypes.oneOfType([
	MENUITEM_PROPTYPE,
	PARENT_MENUITEM_PROPTYPE,
	MENUITEM_CHECKBOX_PROPTYPE,
	MENUITEM_RADIOGROUP_PROPTYPE,
	MENUITEM_SEPARATOR_PROPTYPE,
]));
