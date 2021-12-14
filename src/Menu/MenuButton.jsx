import React from 'react';
import PropTypes from 'prop-types';

function MenuButton(props) {
	const { children, isExpanded } = props;

	//TODO: point aria-controls to the menu (optional)
	//TODO: keyboard interaction
	return (
		<button
			type="button"
			aria-haspopup="menu"
			aria-expanded={ isExpanded }
		>
			{ children }
		</button>
	);
}

MenuButton.propTypes = {
	children: PropTypes.node.isRequired,
	isExpanded: PropTypes.bool,
};

MenuButton.defaultProps = {
	isExpanded: false,
};

export default MenuButton;
