import React from 'react';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

export function renderItem(menuItem, index, array, parentMenuProps) {
	const { renderMenuItem, renderParentMenuItem } = parentMenuProps;
	const { type } = menuItem;
	let node;

	if(type === 'menuitem')
		node = renderMenuItem(menuItem, index, array, parentMenuProps);
	else if(type === 'parentmenuitem')
		node = renderParentMenuItem(menuItem, index, array, parentMenuProps);
	else
		node = renderMenuItem(menuItem, index, array, parentMenuProps);

	return node;
}

export function renderMenuItem(menuItem, index) {
	const { node, props = {} } = menuItem;
	const { isDisabled } = props;

	return (
		<MenuItem key={ index } isDisabled={ isDisabled }>
			{ node }
		</MenuItem>
	);
}

export function renderParentMenuItem(menuItem, index) {
	const { node, menuItems, props = {} } = menuItem;
	const { isDisabled, isEnabled, orientation } = props;

	return (
		<ParentMenuItem
			key={ index }
			menuItems={ menuItems }
			isDisabled={ isDisabled }
			isEnabled={ isEnabled }
			orientation={ orientation }
		>
			{ node }
		</ParentMenuItem>
	);
}
