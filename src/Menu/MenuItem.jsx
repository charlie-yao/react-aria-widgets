import React from 'react';
import PropTypes from 'prop-types';

//TODO: navigation-specific menu item?
const MenuItem = React.forwardRef(function MenuItem(props, ref) {
	const { children, isDisabled, isTabbable, onKeyDown, index } = props;

	return (
		<li
			role="menuitem"
			aria-disabled={ isDisabled }
			tabIndex={ isTabbable ? '0' : '-1' }
			ref={ ref }
			onKeyDown={ onKeyDown }
			data-index={ index }
		>
			{ children }
		</li>
	);
});

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
};

MenuItem.defaultProps = {
	isDisabled: false,
	isTabbable: false,
};

export default MenuItem;
