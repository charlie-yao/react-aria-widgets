import React from 'react';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

/**
 * Renders the items in a particular menu/sub-menu.
 *
 * @param {object} optiopns
 * @returns {React.Component[]}
 */
export function renderItems(options) {
	const { items, setItemRef, tabbableIndex, expandedIndex, collapse, focusRootItem, focusPrevRootItem, focusNextRootItem, onChildKeyDown } = options;
	const itemNodes = [];
	let position = [];
	let flattenedPosition = [];
	let flattenedIndex = 0;

	items.forEach((item, i) => {
		const { type, node, children, orientation, label, labelId, isDisabled, isChecked } = item;

		if(type === 'item') {
			position = position.slice(0);
			position[0] = i;
			flattenedPosition = flattenedPosition.slice(0);
			flattenedPosition[0] = flattenedIndex;

			itemNodes.push(
				<MenuItem
					key={ i }
					position={ position }
					flattenedPosition={ flattenedPosition }
					onKeyDown={ onChildKeyDown }
					isDisabled={ isDisabled }
					isTabbable={ flattenedIndex === tabbableIndex }
					ref={ setItemRef }
				>
					{ node }
				</MenuItem>
			);

			flattenedIndex++;
		}
		else if(type === 'menu') {
			position = position.slice(0);
			position[0] = i;
			flattenedPosition = flattenedPosition.slice(0);
			flattenedPosition[0] = flattenedIndex;

			itemNodes.push(
				<ParentMenuItem
					key={ i }
					items={ children }
					position={ position }
					flattenedPosition={ flattenedPosition }
					onKeyDown={ onChildKeyDown }
					collapse={ collapse }
					focusPrevRootItem={ focusPrevRootItem }
					focusNextRootItem={ focusNextRootItem }
					focusRootItem={ focusRootItem }
					orientation={ orientation }
					label={ label }
					labelId={ labelId }
					isExpanded={ flattenedIndex === expandedIndex }
					isDisabled={ isDisabled }
					isTabbable={ flattenedIndex === tabbableIndex }
					ref={ setItemRef }
				>
					{ node }
				</ParentMenuItem>
			);

			flattenedIndex++;
		}
		else if(type === 'checkbox') {
			position = position.slice(0);
			position[0] = i;
			flattenedPosition = flattenedPosition.slice(0);
			flattenedPosition[0] = flattenedIndex;

			itemNodes.push(
				<MenuItemCheckbox
					key={ i }
					position={ position }
					flattenedPosition={ flattenedPosition }
					onKeyDown={ onChildKeyDown }
					isDisabled={ isDisabled }
					isTabbable={ flattenedIndex === tabbableIndex }
					isChecked={ isChecked }
					ref={ setItemRef }
				>
					{ node }
				</MenuItemCheckbox>
			);

			flattenedIndex++;
		}
		else if(type === 'separator') {
			itemNodes.push(
				<MenuItemSeparator key={ i } orientation={ orientation }>
					{ node }
				</MenuItemSeparator>
			);
		}
		else if(type === 'radiogroup') {
			const radioNodes = [];

			children.forEach((radioItem, j) => {
				const { node, isDisabled, isChecked, value } = radioItem;

				position = position.slice(0);
				position[0] = i;
				flattenedPosition = flattenedPosition.slice(0);
				flattenedPosition[0] = flattenedIndex;

				radioNodes.push(
					<MenuItemRadio
						key={ j }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ onChildKeyDown }
						isDisabled={ isDisabled }
						isTabbable={ flattenedIndex === tabbableIndex }
						isChecked={ isChecked }
						data-value={ value }
						ref={ setItemRef }
					>
						{ node }
					</MenuItemRadio>
				);

				flattenedIndex++;
			});

			itemNodes.push(
				<MenuItemRadioGroup
					key={ i }
					label={ label }
					labelId={ labelId }
				>
					{ radioNodes }
				</MenuItemRadioGroup>
			);
		}
	});

	return itemNodes;
}
