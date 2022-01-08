import React from 'react';
import PropTypes from 'prop-types';

/*
 * Note that if a menu or menubar contains more than one group of
 * menuitemradio elements or if the menu has a group of menuitemradio
 * elements alongside other unrelated menu items:
 *
 * - the menuitemradio elements should be nested in an element with the "group" role
 * - menuitemradio groups should be delimited with an element with the "separator" role
 *
 * See:
 * https://www.w3.org/TR/wai-aria-1.1/#menuitemradio
 */
function MenuItemRadioGroup(props) {
	const { children, label, labelId } = props;

	return (
		<li>
			<ul
				role="group"
				aria-label={ label }
				aria-labelledby={ labelId }
			>
				{ children }
			</ul>
		</li>
	);
}

MenuItemRadioGroup.propTypes = {
	children: PropTypes.node.isRequired,
	label: PropTypes.string,
	labelId: PropTypes.string,
};

MenuItemRadioGroup.defaultProps = {
	label: undefined,
	labelId: undefined,
};

export default MenuItemRadioGroup;
