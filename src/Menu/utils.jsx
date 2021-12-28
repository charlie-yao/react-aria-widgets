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
 * @param {object} metaData Extra data for the item (and any child items if it's a parent menuitem)
 */
export function renderItem(item, index, items, menuProps, metaData) {
	const { renderMenuItem, renderParentMenuItem } = menuProps;
	const { type } = item;
	let node;

	if(type === 'menuitem')
		node = renderMenuItem(item, index, items, menuProps, metaData);
	else if(type === 'parentmenuitem')
		node = renderParentMenuItem(item, index, items, menuProps, metaData);

	return node;
}

/**
 * Renders a menuitem.
 *
 * @param {object} item Descriptor for the menuitem
 * @param {number} index Location of the menuitem within the current (sub-)menu
 * @param {Array} items Array of descriptors representing the items in the current (sub-)menu
 * @param {object} menuProps Props for the current (sub-)menu
 * @param {object} metaData Extra data for the menuitem
 */
export function renderMenuItem(menuItem, index, menuItems, menuProps, metaData) {
	const { node, props = {} } = menuItem;
	const { isDisabled, isFocusable } = props;
	const { ref, id } = metaData;

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
 * @param {object} metaData Extra data for the parent menuitem and its children
 */
export function renderParentMenuItem(item, index, items, menuProps, metaData) {
	const { node, items: childItems, props = {} } = item;
	const { isDisabled, isFocusable, orientation } = props;
	const { ref, id, childMetaData } = metaData;

	return (
		<ParentMenuItem
			key={ index }
			items={ childItems }
			isDisabled={ isDisabled }
			isFocusable={ isFocusable }
			orientation={ orientation }
			ref={ ref }
			id={ id }
			childMetaData={ childMetaData }
		>
			{ node }
		</ParentMenuItem>
	);
}
