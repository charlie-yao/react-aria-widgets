import React from 'react';

/**
 * Creates a HOC that essentially does nothing. This is meant to
 * be a workaround for an issue with React.cloneElement and required
 * props where if you have a component that automatically passes props
 * to its children via React.cloneElement, and those props are marked
 * as required, the children will complain that those props are missing.
 *
 * See:
 * https://github.com/facebook/react/issues/6653
 *
 * @param {Object|function} Component
 * @param {string} displayName
 * @return {Object}
 */
export function createNoOpHOC(Component) {
	/* eslint-disable react/jsx-props-no-spreading */

	const NoOpHOC = React.forwardRef((props, ref) => (
		<Component { ...props } ref={ ref } />
	));

	NoOpHOC.displayName = `NoOpHOC-${getDisplayName(Component)}`;

	return NoOpHOC;

	/* eslint-enable react/jsx-props-no-spreading */
}

/**
 * Gets the display name of a React component.
 * Code taken from here:
 * https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
 *
 * @param {object|function} Component
 * @returns {string}
 */
export function getDisplayName(Component) {
	return Component.displayName || Component.name || 'Component';
}
