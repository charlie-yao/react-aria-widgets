/**
 * Because HTML only allows <h1> to <h6>, complain if
 * an invalid level prop gets passed in.
 *
 * @param {Object} props
 * @param {string} propName
 * @returns {Error}
 */
export function validateLevelProp(props, propName) {
	console.log(props, propName);

	const level = props[propName];

	if(!Number.isInteger(level) || level < 1 || level > 6)
		return new Error(`${propName} must be an integer between 1 and 6 (inclusive).`);
}
