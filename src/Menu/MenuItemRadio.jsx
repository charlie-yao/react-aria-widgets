import React from 'react';
import PropTypes from 'prop-types';

const MenuItemRadio = React.forwardRef(function MenuItemRadio(props, ref) {
	const { children, subIndex, position, flattenedPosition, onKeyDown, isDisabled, isTabbable, isChecked, ...rest } = props;

	return (
		<li
			role="menuitemradio"
			data-subindex={ subIndex }
			data-position={ position }
			data-flattenedposition={ flattenedPosition }
			onKeyDown={ onKeyDown }
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
	subIndex: PropTypes.number.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
	onKeyDown: PropTypes.func.isRequired,
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
