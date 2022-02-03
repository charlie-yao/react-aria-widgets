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
	/* eslint-disable react/no-array-index-key */

	const { items, setItemRef, tabbableIndex, expandedIndex, collapseItem, focusRootItem, focusPrevRootItem, focusNextRootItem, position, flattenedPosition, onChildKeyDown } = options;
	const itemNodes = [];
	const level = position.length;
	let _position = [];
	let _flattenedPosition = [];
	let flattenedIndex = 0;

	items.forEach((item, i) => {
		const { type, node, children, orientation, label, labelId, isDisabled, isChecked } = item;

		if(type === 'item') {
			_position = position.slice(0);
			_position[level] = i;
			_flattenedPosition = flattenedPosition.slice(0);
			_flattenedPosition[level] = flattenedIndex;

			itemNodes.push(
				<MenuItem
					key={ i }
					position={ _position }
					flattenedPosition={ _flattenedPosition }
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
			_position = position.slice(0);
			_position[level] = i;
			_flattenedPosition = flattenedPosition.slice(0);
			_flattenedPosition[level] = flattenedIndex;

			itemNodes.push(
				<ParentMenuItem
					key={ i }
					items={ children }
					position={ _position }
					flattenedPosition={ _flattenedPosition }
					onKeyDown={ onChildKeyDown }
					collapse={ collapseItem }
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
			_position = position.slice(0);
			_position[level] = i;
			_flattenedPosition = flattenedPosition.slice(0);
			_flattenedPosition[level] = flattenedIndex;

			itemNodes.push(
				<MenuItemCheckbox
					key={ i }
					position={ _position }
					flattenedPosition={ _flattenedPosition }
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

				_position = position.slice(0);
				_position[level] = i;
				_flattenedPosition = flattenedPosition.slice(0);
				_flattenedPosition[level] = flattenedIndex;

				radioNodes.push(
					<MenuItemRadio
						key={ j }
						position={ _position }
						flattenedPosition={ _flattenedPosition }
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

	/* eslint-enable react/no-array-index-key */
}
