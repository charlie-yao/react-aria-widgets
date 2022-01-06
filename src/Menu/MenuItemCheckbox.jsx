import React from 'react';
import PropTypes from 'prop-types';

const MenuItemCheckbox = React.forwardRef(function MenuItem(props, ref) {
	const { children, index, level, onKeyDown, isDisabled, isTabbable, checked } = props;

	return (
		<li
			role="menuitemcheckbox"
			data-index={ index }
			data-level={ level }
			onKeyDown={ onKeyDown }
			aria-disabled={ isDisabled }
			tabIndex={ isTabbable ? '0' : '-1' }
			aria-checked={ checked }
			ref={ ref }
		>
			{ children }
		</li>
	);
});

MenuItemCheckbox.propTypes = {
	children: PropTypes.node.isRequired,
	index: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
	checked: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf([ 'true', 'false', 'mixed' ]),
	]).isRequired,
};

MenuItemCheckbox.defaultProps = {
	isDisabled: false,
	isTabbable: false,
	checked: false,
};

export default MenuItemCheckbox;
