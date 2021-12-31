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
 * @param {function} onKeyDown
 */
export function renderItem(item, index, items, menuProps, onKeyDown) {
	const { renderMenuItem, renderParentMenuItem } = menuProps;
	const { type } = item;
	let node;

	if(type === 'menuitem')
		node = renderMenuItem(item, index, items, menuProps, onKeyDown);
	else if(type === 'parentmenuitem')
		node = renderParentMenuItem(item, index, items, menuProps, onKeyDown);

	return node;
}

/**
 * Renders a menuitem.
 *
 * @param {object} item Descriptor for the menuitem
 * @param {number} index Location of the menuitem within the current (sub-)menu
 * @param {Array} items Array of descriptors representing the items in the current (sub-)menu
 * @param {object} menuProps Props for the current (sub-)menu
 * @param {function} onKeyDown
 */
export function renderMenuItem(menuItem, index, menuItems, menuProps, onKeyDown) {
	const { node, isDisabled, isFocusable, ref, position } = menuItem;

	return (
		<MenuItem
			key={ index }
			isDisabled={ isDisabled }
			isFocusable={ isFocusable }
			ref={ ref }
			onKeyDown={ onKeyDown }
			position={ position }
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
 * @param {function} onKeyDown
 */
export function renderParentMenuItem(item, index, items, menuProps, onKeyDown) {
	const { node, children, isDisabled, isFocusable, orientation, isExpanded, ref, position } = item;

	return (
		<ParentMenuItem
			key={ index }
			items={ children }
			isExpanded={ isExpanded }
			isDisabled={ isDisabled }
			isFocusable={ isFocusable }
			orientation={ orientation }
			ref={ ref }
			onKeyDown={ onKeyDown }
			position={ position }
		>
			{ node }
		</ParentMenuItem>
	);
}

/**
 * Checks if the item is a "parent menuitem".
 *
 * According to the WAI-ARIA Authoring Practices 1.1,
 * we know that a sub-menu must be the immediate
 * sibling of the menuitem that opens it.
 *
 * See:
 * https://www.w3.org/TR/wai-aria-practices-1.1/#menu
 *
 * @param {(object)|(HTMLElement)} item
 * @return {boolean}
 */
export function isParentMenuitem(item) {
	if(item === undefined || item === null)
		return false;
	else if(item instanceof HTMLElement) {
		const role = item.getAttribute('role');
		const nextSibling = item.nextElementSibling;
		const nextSiblingRole = nextSibling ? nextSibling.getAttribute('role') : undefined;
		return role === 'menuitem' && nextSiblingRole === 'menu';
	}
	else
		return item.type === 'parentmenuitem';
}
