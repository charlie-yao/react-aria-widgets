import React from 'react';
import PropTypes from 'prop-types';

const MenuItemRadio = React.forwardRef(function MenuItemRadio(props, ref) {
	const { children, index, refIndex, subIndex, level, position, onKeyDown, isDisabled, isTabbable, isChecked } = props;

	return (
		<li
			role="menuitemradio"
			data-index={ index }
			data-refindex={ refIndex }
			data-subindex={ subIndex }
			data-level={ level }
			data-position={ position }
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
	index: PropTypes.number.isRequired,
	refIndex: PropTypes.number.isRequired,
	subIndex: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
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
