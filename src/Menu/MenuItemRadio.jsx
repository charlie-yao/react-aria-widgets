import React from 'react';
import PropTypes from 'prop-types';

const MenuItemRadio = React.forwardRef(function MenuItemRadio(props, ref) {
	const { children, index, level, onKeyDown, isDisabled, isTabbable, isChecked } = props;

	return (
		<li
			role="menuitemradio"
			data-index={ index }
			data-level={ level }
			onKeyDown={ onKeyDown }
			aria-disabled={ isDisabled }
			tabIndex={ isTabbable ? '0' : '-1' }
			aria-checked={ isChecked }
			ref={ ref }
		>
			{ children }
		</li>
	);
});

MenuItemRadio.propTypes = {
	children: PropTypes.node.isRequired,
//	index: PropTypes.number.isRequired,
//	level: PropTypes.number.isRequired,
//	onKeyDown: PropTypes.func.isRequired,
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
