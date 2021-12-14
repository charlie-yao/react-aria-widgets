import React from 'react';
import PropTypes from 'prop-types';

function MenuBar(props) {
	const { children, orientation } = props;

	return (
		<ul
			role="menubar"
			aria-orientation={ orientation }
		>
			{ children }
		</ul>
	);
}

MenuBar.propTypes = {
	children: PropTypes.node.isRequired,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
};

MenuBar.defaultProps = {
	orientation: 'horizontal',
};

export default MenuBar;
