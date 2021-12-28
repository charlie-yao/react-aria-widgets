import React from 'react';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

export function renderItem(menuItem, index, array, parentMenuProps, refs) {
	const { renderMenuItem, renderParentMenuItem } = parentMenuProps;
	const { type } = menuItem;
	let node;

	if(type === 'menuitem')
		node = renderMenuItem(menuItem, index, array, parentMenuProps, refs);
	else if(type === 'parentmenuitem')
		node = renderParentMenuItem(menuItem, index, array, parentMenuProps, refs);
	else
		node = renderMenuItem(menuItem, index, array, parentMenuProps, refs);

	return node;
}

export function renderMenuItem(menuItem, index, array, parentMenuProps, refs) {
	const { node, props = {} } = menuItem;
	const { isDisabled } = props;

	return (
		<MenuItem key={ index } isDisabled={ isDisabled } ref={ refs[index] }>
			{ node }
		</MenuItem>
	);
}

export function renderParentMenuItem(menuItem, index, array, parentMenuProps, refs) {
	const { node, menuItems, props = {} } = menuItem;
	const { isDisabled, isEnabled, orientation } = props;
	const { ref, childRefs } = refs[index];

	return (
		<ParentMenuItem
			key={ index }
			menuItems={ menuItems }
			isDisabled={ isDisabled }
			isEnabled={ isEnabled }
			orientation={ orientation }
			ref={ ref }
			refs={ childRefs }
		>
			{ node }
		</ParentMenuItem>
	);
}
