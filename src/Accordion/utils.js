//Misc.
import { createCustomPropType } from 'src/utils';

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
