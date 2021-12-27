import React from 'react';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

export function renderItem(menuItem, index, array, menuBarProps) {
	const { renderMenuItem, renderParentMenuItem } = menuBarProps;
	const { type } = menuItem;
	let node;

	if(type === 'menuitem')
		node = renderMenuItem(menuItem, index, array, menuBarProps);
	else if(type === 'parentmenuitem')
		node = renderParentMenuItem(menuItem, index, array, menuBarProps);
	else
		node = renderMenuItem(menuItem, index, array, menuBarProps);

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
}
