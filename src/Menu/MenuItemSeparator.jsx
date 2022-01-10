import React from 'react';
import PropTypes from 'prop-types';

/*
 * In the authoring practices guide, they say,
 * "All separators should have aria-orientation consistent
 * with the separator's orientation."
 *
 * That statement doesn't make much sense to me because it's
 * tautological. At first glance, it seems like a typo and
 * that the correct wording should be "consistent with the
 * containing menu or menubar's orientation", but that also
 * doesn't make sense. If a menu or menubar is oriented
 * vertically, then the separator should be horizontal,
 * and vice-versa, right?
 *
 * See:
 * https://www.w3.org/TR/wai-aria-practices-1.1/#menu
 *
 * TODO: is it necessary to attach a ref to these?
 */
const MenuItemSeparator = React.forwardRef(function MenuItemSeparator(props, ref) {
	const { children, index, level, orientation } = props;

	return (
		<li	
			role="separator"
			data-index={ index }
			data-level={ level }
			aria-orientation={ orientation }
			ref={ ref }
		>
			{ children }
		</li>
	);
});

MenuItemSeparator.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired, //TODO is this necessary?
	level: PropTypes.number.isRequired, //TODO is this necessary?
	orientation: PropTypes.oneOf([ 'horizontal', 'vertical' ]),
};

MenuItemSeparator.defaultProps = {
	children: undefined,
	orientation: 'horizontal',
};

export default MenuItemSeparator;
