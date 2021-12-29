import React from 'react';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

/**
 * Renders an item in a (sub-)menu.
 *
 * Note that this function only receives data for the current level of the
 * overall menu, i.e. if this function is being run of a sub-menu, then
 * arguments like parentMenuProps can only see data for this sub-menu and below.
 *
 * @param {object} item Descriptor for the item
 * @param {number} index Location of the item within the current (sub-)menu
 * @param {Array} items Array of descriptors representing the items in the current (sub-)menu
 * @param {object} menuProps Props for the current (sub-)menu
 */
export function renderItem(item, index, items, menuProps) {
	const { renderMenuItem, renderParentMenuItem } = menuProps;
	const { type } = item;
	let node;

	if(type === 'menuitem')
		node = renderMenuItem(item, index, items, menuProps);
	else if(type === 'parentmenuitem')
		node = renderParentMenuItem(item, index, items, menuProps);

	return node;
}

/**
 * Renders a menuitem.
 *
 * @param {object} item Descriptor for the menuitem
 * @param {number} index Location of the menuitem within the current (sub-)menu
 * @param {Array} items Array of descriptors representing the items in the current (sub-)menu
 * @param {object} menuProps Props for the current (sub-)menu
 */
export function renderMenuItem(menuItem, index, menuItems, menuProps) {
	const { node, isDisabled, isFocusable, ref, id } = menuItem;

	return (
		<MenuItem
			key={ index }
			isDisabled={ isDisabled }
			isFocusable={ isFocusable }
			ref={ ref }
			id={ id }
		>
			{ node }
		</MenuItem>
	);
}

/**
 * Renders a parent menuitem.
 *
 * Note that a "parent menuitem" is a menuitem that acts as a parent
 * for a sub-menu. The term "parent menuitem" is NOT being used to
 * communicate "parent of the current item", though that parent would
 * be a "parent menuitem".
 *
 * @param {object} item Descriptor for the parent menuitem
 * @param {number} index Location of the parent menuitem within the current (sub-)menu
 * @param {Array} items Array of descriptors representing the items in the current (sub-)menu
 * @param {object} menuProps Props for the current (sub-)menu
 */
export function renderParentMenuItem(item, index, items, menuProps) {
	const { node, items: childItems, isDisabled, isFocusable, orientation, isExpandable, ref, id } = item;

	return (
		<ParentMenuItem
			key={ index }
			items={ childItems }
			isExpandable={ isExpandable }
			isDisabled={ isDisabled }
			isFocusable={ isFocusable }
			orientation={ orientation }
			ref={ ref }
			id={ id }
		>
			{ node }
		</ParentMenuItem>
	);
}
