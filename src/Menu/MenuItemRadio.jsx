/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

const MenuItemRadio = React.forwardRef(function MenuItemRadio(props, ref) {
	const {
		children, position, flattenedPosition,
		onKeyDown, onClick, onMouseEnter, onMouseLeave,
		isDisabled, isTabbable, isChecked, ...rest
	} = props;

	return (
		<li
			role="menuitemradio"
			data-position={ position }
			data-flattenedposition={ flattenedPosition }
			onKeyDown={ onKeyDown }
			onClick={ onClick }
			onMouseEnter={ onMouseEnter }
			onMouseLeave={ onMouseLeave }
			aria-disabled={ isDisabled }
			tabIndex={ isTabbable ? '0' : '-1' }
			aria-checked={ isChecked }
			{ ...rest }
			ref={ ref }
		>
			{ children }
		</li>
	);
});

MenuItemRadio.propTypes = {
	children: PropTypes.node.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
	onKeyDown: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onMouseEnter: PropTypes.func.isRequired,
	onMouseLeave: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
	isChecked: PropTypes.bool,
};

MenuItemRadio.defaultProps = {
	isDisabled: false,
	isTabbable: false,
	isChecked: false,
};

export default MenuItemRadio;
