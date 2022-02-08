import React from 'react';
import PropTypes from 'prop-types';

const MenuItemCheckbox = React.forwardRef(function MenuItemCheckbox(props, ref) {
	const {
		children, position, flattenedPosition,
		onKeyDown, onClick, onMouseEnter, onMouseLeave,
		isDisabled, isTabbable, isChecked
	} = props;

	return (
		<li
			role="menuitemcheckbox"
			data-position={ position }
			data-flattenedposition={ flattenedPosition }
			onKeyDown={ onKeyDown }
			onClick={ onClick }
			onMouseEnter={ onMouseEnter }
			onMouseLeave={ onMouseLeave }
			aria-disabled={ isDisabled }
			tabIndex={ isTabbable ? '0' : '-1' }
			aria-checked={ isChecked }
			ref={ ref }
		>
			{ children }
		</li>
	);
});

MenuItemCheckbox.propTypes = {
	children: PropTypes.node.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
	onKeyDown: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onMouseEnter: PropTypes.func.isRequired,
	onMouseLeave: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
	isChecked: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf([ 'true', 'false', 'mixed' ]),
	]),
};

MenuItemCheckbox.defaultProps = {
	isDisabled: false,
	isTabbable: false,
	isChecked: false,
};

export default MenuItemCheckbox;
