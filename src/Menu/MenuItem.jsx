import React from 'react';
import PropTypes from 'prop-types';

function MenuItem(props) {
	const { children, isDisabled } = props;

	return (
		<li role="menuitem" aria-disabled={ isDisabled } tabindex="-1">
			{ children }
		</li>
	);
}

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	isDisabled: PropTypes.bool,
};

MenuItem.defaultProps = {
	isDisabled: false,
};

export default MenuItem;
