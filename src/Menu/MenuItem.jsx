import React from 'react';
import PropTypes from 'prop-types';

//TODO: navigation-specific menu item?
const MenuItem = React.forwardRef(function MenuItem(props, ref) {
	const { children, isDisabled, isFocusable, id, onKeyDown, } = props;

	return (
		<li
			role="menuitem"
			aria-disabled={ isDisabled }
			tabIndex={ isFocusable ? '0' : '-1' }
			ref={ ref }
			id={ id }
			onKeyDown={ onKeyDown }
		>
			{ children }
		</li>
	);
});

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	isFocusable: PropTypes.bool,
	id: PropTypes.string,
};

MenuItem.defaultProps = {
	isDisabled: false,
	isFocusable: false,
	id: undefined,
};

export default MenuItem;
