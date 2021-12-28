import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';
import { renderItem, renderMenuItem, renderParentMenuItem } from 'src/Menu/utils';

const ParentMenuItem = React.forwardRef(function ParentMenuItem(props, ref) {
	const { children, menuItems, refs, isExpanded, isDisabled, orientation, renderItem } = props;
	const menuItemNodes = menuItems.map((mi, index, array) => {
		return renderItem(mi, index, array, props, refs);
	});

	return (
		<li role="none">
			<a
				href="#"
				role="menuitem"
				aria-haspopup="menu"
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				tabIndex="0"
				ref={ ref }
			>
				{ children }
			</a>
			<Menu orientation={ orientation }>
				{ menuItemNodes }
			</Menu>
		</li>
	);
});

ParentMenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	menuItems: MENU_ITEMS_PROPTYPE.isRequired,
	refs: PropTypes.arrayOf(PropTypes.shape({
		current: PropTypes.object,
	})).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
	renderItem: PropTypes.func,
	renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	orientation: 'horizontal',
	renderItem,
	renderMenuItem,
	renderParentMenuItem,
};

export default ParentMenuItem;
