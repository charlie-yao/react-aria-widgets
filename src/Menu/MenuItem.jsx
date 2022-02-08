import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
	const {
		children, position, flattenedPosition,
		onKeyDown, onClick, onMouseEnter, onMouseLeave,
		isDisabled, isTabbable
	} = props;

	return (
		<li
			role="menuitem"
			data-position={ position }
			data-flattenedposition={ flattenedPosition }
			onKeyDown={ onKeyDown }
			onClick={ onClick }
			onMouseEnter={ onMouseEnter }
			onMouseLeave={ onMouseLeave }
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
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
	onKeyDown: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onMouseEnter: PropTypes.func.isRequired,
	onMouseLeave: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
};

MenuItem.defaultProps = {
	isDisabled: false,
	isTabbable: false,
};

export default MenuItem;
