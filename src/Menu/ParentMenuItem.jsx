import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';

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
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf([ 'menuitem', 'parentmenuitem', 'menuitemcheckbox', 'menuitemreadio', 'separator' ]),
		node: PropTypes.node.isRequired,
		menuItems: PropTypes.array, //Only required for "parentmenuitem"
		props: PropTypes.object,
	})).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	renderItem: PropTypes.func,
	renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	renderItem: function renderItem(menuItem, index, array, parentItemProps) {
		const { renderMenuItem, renderParentMenuItem } = parentItemProps;
		const { type } = menuItem;
		let node;

		if(type === 'menuitem')
			node = renderMenuItem(menuItem, index, array, parentItemProps);
		else if(type === 'parentmenuitem')
			node = renderParentMenuItem(menuItem, index, array, parentItemProps);
		else
			node = renderMenuItem(menuItem, index, array, parentItemProps);

		return node;
	},
	renderMenuItem: function renderMenuItem(menuItem, index) {
		const { node, props = {} } = menuItem;
		const { isDisabled } = props;

		return (
			<MenuItem key={ index } isDisabled={ isDisabled }>
				{ node }
			</MenuItem>
		);
	},
	renderParentMenuItem: function renderParentMenuItem(menuItem, index) {
		const { node, menuItems, props = {} } = menuItem;
		const { isDisabled, isEnabled } = props;

		return (
			<ParentMenuItem
				key={ index }
				menuItems={ menuItems }
				isDisabled={ isDisabled }
				isEnabled={ isEnabled }
			>
				{ node }
			</ParentMenuItem>
		);
	},
};

export default ParentMenuItem;
