import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
	const { children, index, refIndex, level, position, onKeyDown, isDisabled, isTabbable } = props;

	return (
		<li
			role="menuitem"
			data-index={ index }
			data-refindex={ refIndex }
			data-level={ level }
			data-position={ position }
			onKeyDown={ onKeyDown }
			aria-disabled={ isDisabled }
			tabIndex={ isTabbable ? '0' : '-1' }
			ref={ ref }
		>
			{ children }
		</li>
	);
});

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	index: PropTypes.number.isRequired,
	refIndex: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired,
	position: PropTypes.arrayOf(PropTypes.number.isRequired),
	onKeyDown: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
};

MenuItem.defaultProps = {
	isDisabled: false,
	isTabbable: false,
};

export default MenuItem;
