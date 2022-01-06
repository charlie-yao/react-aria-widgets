import React from 'react';
import PropTypes from 'prop-types';

function MenuItemSeparator(props) {
	const { children } = props;

	return (
		<li role="separator">
			{ children }
		</li>
	);
}

MenuItemSeparator.propTypes = {
	children: PropTypes.node,
};

MenuItemSeparator.defaultProps = {
	children: undefined,
};

export default MenuItemSeparator;
