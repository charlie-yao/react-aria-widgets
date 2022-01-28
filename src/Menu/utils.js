import React from 'react';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

/**
 * Renders the menu items in a single level of a menu,
 * whether it be from a menu button, menubar, or a parent
 * menuitem.
 *
 * While this function doesn't accept arguments, it assumes
 * this is being used in the context of a React component
 * calling this with bind().
 *
 * @return {object[]}
 */
export function renderItems() {
	/* eslint-disable react/no-array-index-key */
	console.log(this);
	const { items } = this.props;
	const { tabbableIndex, expandedIndex } = this.state;
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
					onKeyDown={ this.onChildKeyDown }
					isDisabled={ isDisabled }
					isTabbable={ flattenedIndex === tabbableIndex }
					ref={ this.childItemRefs[flattenedIndex] }
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
					onKeyDown={ this.onChildKeyDown }
					collapse={ this.collapseChild }
					focusPrevRootItem={ this.focusPrevChild }
					focusNextRootItem={ this.focusNextChild }
					focusRootItem={ this.focusChild }
					orientation={ orientation }
					label={ label }
					labelId={ labelId }
					isExpanded={ flattenedIndex === expandedIndex }
					isDisabled={ isDisabled }
					isTabbable={ flattenedIndex === tabbableIndex }
					ref={ this.childItemRefs[flattenedIndex] }
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
					onKeyDown={ this.onChildKeyDown }
					isDisabled={ isDisabled }
					isTabbable={ flattenedIndex === tabbableIndex }
					isChecked={ isChecked }
					ref={ this.childItemRefs[flattenedIndex] }
				>
					{ node }
				</MenuItemCheckbox>
			);

			flattenedIndex++;
		}
		else if(type === 'separator') {
			itemNodes.push(
				<MenuItemSeparator
					key={ i }
					onKeyDown={ this.onChildKeyDown }
					orientation={ orientation }
				>
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
						subIndex={ j }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						isTabbable={ flattenedIndex === tabbableIndex }
						isChecked={ isChecked }
						data-value={ value }
						ref={ this.childItemRefs[flattenedIndex] }
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
