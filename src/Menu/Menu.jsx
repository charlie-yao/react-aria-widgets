import React from 'react';
import PropTypes from 'prop-types';

function Menu(props) {
	const { children, orientation } = props;
	
	//TODO keyboard support if orientation is horizontal?
	return (
		<ul
			role="menu"
			aria-orientation={ orientation }
		>
			{ children }
		</ul>
	);
}

Menu.propTypes = {
	children: PropTypes.node.isRequired,
	orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

Menu.defaultProps = {
	orientation: 'vertical',
};

export default Menu;
