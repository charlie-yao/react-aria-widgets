import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';
import { renderItem, renderMenuItem, renderParentMenuItem } from 'src/Menu/utils';

function ParentMenuItem(props) {
	const { children, menuItems, isExpanded, isDisabled, renderItem } = props;
	const menuItemNodes = menuItems.map((mi, index, array) => {
		return renderItem(mi, index, array, props);
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
			>
				{ children }
			</a>
			<ul role="menu">
				{ menuItemNodes }
			</ul>
		</li>
	);
}

ParentMenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	menuItems: MENU_ITEMS_PROPTYPE.isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	renderItem: PropTypes.func,
	renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	renderItem,
	renderMenuItem,
	renderParentMenuItem,
};

export default ParentMenuItem;
