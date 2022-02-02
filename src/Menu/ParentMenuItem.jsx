import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//HOCs
import createMenuManager from 'src/Menu/createMenuManager';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

class _ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		position: PropTypes.arrayOf(PropTypes.number).isRequired,
		flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
		onKeyDown: PropTypes.func.isRequired,
		collapse: PropTypes.func.isRequired,
		focusPrevRootItem: PropTypes.func,
		focusNextRootItem: PropTypes.func,
		focusRootItem: PropTypes.func,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		isExpanded: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isTabbable: PropTypes.bool,
		//From MenuManager
		setManagerRef: PropTypes.func.isRequired,
		setItemRef: PropTypes.func.isRequired,
		expandedIndex: PropTypes.number.isRequired,
		collapseItem: PropTypes.func.isRequired,
		expandItem: PropTypes.func.isRequired,
		focus: PropTypes.func.isRequired,
		focusPrevItem: PropTypes.func.isRequired,
		focusNextItem: PropTypes.func.isRequired,
		focusFirstItem: PropTypes.func.isRequired,
		focusLastItem: PropTypes.func.isRequired,
		focusItemFirstChild: PropTypes.func.isRequired,
	};

	static defaultProps = {
		focusPrevRootItem: undefined,
		focusNextRootItem: undefined,
		focusRootItem: undefined,
		orientation: 'vertical',
		label: undefined,
		labelId: undefined,
		isExpanded: false,
		isDisabled: false,
		isTabbable: false,
	};

	//---- Events ----
	onChildKeyDown = (event) => {
		const {
			items, collapse, focusPrevRootItem, focusNextRootItem, focusRootItem, orientation,
			expandItem, focus, focusPrevItem, focusNextItem, focusFirstItem, focusLastItem, focusItemFirstChild,
		} = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const flattenedRootIndex = Number.parseInt(flattenedPosition[0], 10);
		const level = position.length - 1;
		const item = items[index];
		const { type, onActivate } = item;

		//console.log(position, flattenedPosition, index, flattenedIndex, level, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'vertical')
				focusPrevItem(flattenedIndex);
			else {
				collapse(false, () => {
					if(level === 1 && focusPrevRootItem)
						focusPrevRootItem(flattenedRootIndex, true);
					else
						focus();
				});
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(orientation === 'vertical')
				focusNextItem(flattenedIndex);
			else {
				if(type === 'menu') {
					expandItem(flattenedIndex, () => {
						focusItemFirstChild(flattenedIndex);
					});
				}
				else if(focusNextRootItem) {
					collapse(true, () => {
						focusNextRootItem(flattenedRootIndex, true);
					});
				}
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(orientation === 'vertical') {
				collapse(false, () => {
					if(level === 1 && focusPrevRootItem)
						focusPrevRootItem(flattenedRootIndex, true);
					else
						focus();
				});
			}
			else
				focusPrevItem(flattenedIndex);
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(orientation === 'vertical') {
				if(type === 'menu') {
					expandItem(flattenedIndex, () => {
						focusItemFirstChild(flattenedIndex);
					});
				}
				else if(focusNextRootItem) {
					console.log('here 1');
					collapse(true, () => {
						console.log('here 2');
						focusNextRootItem(flattenedRootIndex, true);
					});
				}
			}
			else
				focusNextItem(flattenedIndex);
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

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
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

				collapse(true, () => {
					focusRootItem(flattenedRootIndex);
				});
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
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();

			collapse(false, () => {
				focus();
			});
		}
		else if(key === 'Tab')
			collapse(true);
	};

	//---- Rendering ----
	render() {
		const {
			children, position, flattenedPosition, onKeyDown,
			orientation, label, labelId,
			isExpanded, isDisabled, isTabbable,
			setManagerRef,
		} = this.props;

		//console.log(this.props, this.state, this.itemRef, this.childItemRefs);

		return (
			<li role="none">
				<a
					href="#"
					role="menuitem"
					aria-haspopup="menu"
					data-position={ position }
					data-flattenedposition={ flattenedPosition }
					onKeyDown={ onKeyDown }
					aria-expanded={ isExpanded }
					aria-disabled={ isDisabled }
					tabIndex={ isTabbable ? '0' : '-1' }
					ref={ setManagerRef }
				>
					{ children }
				</a>
				<Menu
					orientation={ orientation }
					label={ label }
					labelId={ labelId }
				>
					{ this.renderItems() }
				</Menu>
			</li>
		);
	}

	renderItems = () => {
		/* eslint-disable react/no-array-index-key */

		const {
			items, focusPrevRootItem, focusNextRootItem, focusRootItem, position, flattenedPosition,
			setItemRef, expandedIndex, collapseItem,
		} = this.props;
		const level = position.length;
		const itemNodes = [];
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
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
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
						onKeyDown={ this.onChildKeyDown }
						collapse={ collapseItem }
						focusPrevRootItem={ focusPrevRootItem }
						focusNextRootItem={ focusNextRootItem }
						focusRootItem={ focusRootItem }
						orientation={ orientation }
						label={ label }
						labelId={ labelId }
						isExpanded={ flattenedIndex === expandedIndex }
						isDisabled={ isDisabled }
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
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
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
							onKeyDown={ this.onChildKeyDown }
							isDisabled={ isDisabled }
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

const ParentMenuItem = createMenuManager(_ParentMenuItem);

export default ParentMenuItem;
