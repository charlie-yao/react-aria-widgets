import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//HOCs
import createMenuFocusManager from 'src/Menu/createMenuFocusManager';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

/*
 * Note:
 *
 * - If the menubar has a visible label, a labelId prop that points towards
 * the labeling element should be provided. Otherwise, one should pass in
 * a label via the label prop. In other words, one XOR the other must be provided.
 */
class MenuBar extends React.Component {
	static propTypes = {
		items: MENUITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		//From MenuFocusManager
		setItemRef: PropTypes.func.isRequired,
		tabbableIndex: PropTypes.number.isRequired,
		expandedIndex: PropTypes.number.isRequired,
		collapseItem: PropTypes.func.isRequired,
		expandItem: PropTypes.func.isRequired,
		focusItem: PropTypes.func.isRequired,
		focusPrevItem: PropTypes.func.isRequired,
		focusNextItem: PropTypes.func.isRequired,
		focusFirstItem: PropTypes.func.isRequired,
		focusLastItem: PropTypes.func.isRequired,
		focusItemFirstChild: PropTypes.func.isRequired,
		focusItemLastChild: PropTypes.func.isRequired,
	};

	static defaultProps = {
		orientation: 'horizontal',
		label: undefined,
		labelId: undefined,
	};

	//---- Events ----
	onChildKeyDown = (event) => {
		const {
			items, orientation,
			collapseItem, expandItem, focusPrevItem, focusNextItem, focusFirstItem, focusLastItem,
			focusItemFirstChild, focusItemLastChild,
		} = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const item = items[index];
		const { type, onActivate } = item;

		//console.log(position, flattenedPosition, index, flattenedIndex, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				if(type === 'menu') {
					expandItem(flattenedIndex, () => {
						focusItemLastChild(flattenedIndex);
					});
				}
			}
			else
				focusPrevItem(flattenedIndex);
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				if(type === 'menu') {
					expandItem(flattenedIndex, () => {
						focusItemFirstChild(flattenedIndex);
					});
				}
			}
			else
				focusNextItem(flattenedIndex);
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(orientation === 'horizontal')
				focusPrevItem(flattenedIndex);
			else {
				if(type === 'menu') {
					expandItem(flattenedIndex, () => {
						focusItemLastChild(flattenedIndex);
					});
				}
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(orientation === 'horizontal')
				focusNextItem(flattenedIndex);
			else {
				if(type === 'menu') {
					expandItem(flattenedIndex, () => {
						focusItemFirstChild(flattenedIndex);
					});
				}
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				expandItem(flattenedIndex, () => {
					focusItemFirstChild(flattenedIndex);
				});
			}
			else if(type === 'checkbox') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(type === 'menu') {
				expandItem(flattenedIndex, () => {
					focusItemFirstChild(flattenedIndex);
				});
			}
			else if(type === 'checkbox') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);
			}
		}
		else if(key === 'Home') {
			event.preventDefault();
			focusFirstItem();
		}
		else if(key === 'End') {
			event.preventDefault();
			focusLastItem();
		}
		else if(key === 'Tab')
			collapseItem();
	};

	//---- Rendering ----
	render() {
		const { orientation, label, labelId } = this.props;

		//console.log(this.props, this.state, this.childItemRefs);

		return (
			<ul
				role="menubar"
				aria-orientation={ orientation }
				aria-labelledby={ labelId }
				aria-label={ label }
			>
				{ this.renderItems() }
			</ul>
		);
	}

	renderItems = () => {
		/* eslint-disable react/no-array-index-key */

		const {
			items, setItemRef, tabbableIndex, expandedIndex,
			collapseItem, focusItem, focusPrevItem, focusNextItem,
		} = this.props;
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
						onKeyDown={ this.onChildKeyDown }
						collapse={ collapseItem }
						focusPrevRootItem={ focusPrevItem }
						focusNextRootItem={ focusNextItem }
						focusRootItem={ focusItem }
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
						onKeyDown={ this.onChildKeyDown }
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
							onKeyDown={ this.onChildKeyDown }
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
	};
}

export default createMenuFocusManager(MenuBar);
