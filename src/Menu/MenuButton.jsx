import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//HOCs
import createMenuManager from 'src/Menu/createMenuManager';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

/*
 * Note about labels and IDs:
 *
 * 1) Passing in an id prop means giving the menu an aria-labelledby attribute
 * that points to the <button>. Passing a menuLabel prop means giving the menu
 * an aria-label attribute. However, since the menu is controlled by the <button>
 * and the <button> is likely going to contain accessible label text, chances are,
 * you should be using the id prop to label the menu instead of the menuLabel prop.
 *
 * See:
 * https://www.w3.org/TR/wai-aria-1.1/#aria-label
 *
 * This also means that, as it's current programmed, the menu's aria-labelledby
 * attribute cannot point to any other HTML element other than the <button>
 * controlling it.
 *
 * 2) One can optionally pass in a menuId prop, giving the <button> an
 * aria-controls attribute that points to the menu.
 */
class MenuButton extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		menuLabel: PropTypes.string,
		menuId: PropTypes.string,
		id: PropTypes.string,
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
		orientation: 'vertical',
		menuLabel: undefined,
		menuId: undefined,
		id: undefined,
	};

	constructor(props) {
		super(props);

		this.state = {
			isExpanded: false,
		};
	}

	//---- Events ----
	onKeyDown = (event) => {
		const { focusFirstItem, focusLastItem } = this.props;
		const { key } = event;

		if(key === 'Enter' || key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			this.expandButton(() => {
				focusFirstItem();
			});
		}
		else if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			this.expandButton(() => {
				focusLastItem();
			});
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			this.expandButton(() => {
				focusFirstItem();
			});
		}
	};

	onChildKeyDown = (event) => {
		const {
			items, orientation,
			expandItem, focus, focusPrevItem, focusNextItem, focusFirstItem, focusLastItem,
			focusItemFirstChild,
		} = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const isDisabled = target.getAttribute('aria-disabled') === 'true'; //can't use isDisabled on the item for radiogroups
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const item = items[index];
		const { type, onActivate } = item;

		//console.log(position, flattenedPosition, index, flattenedIndex, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'vertical')
				focusPrevItem(flattenedIndex);
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
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(orientation === 'horizontal')
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
			}
			else
				focusNextItem(flattenedIndex);
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(isDisabled)
				return;

			if(type === 'menu') {
				expandItem(flattenedIndex, () => {
					focusItemFirstChild(flattenedIndex);
				});
			}
			else if(type === 'checkbox') {
				if(typeof onActivate === 'function')
					onActivate(event);

				this.collapseButton(() => {
					focus();
				});
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);

				this.collapseButton(() => {
					focus();
				});
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);

				this.collapseButton(() => {
					focus();
				});
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(isDisabled)
				return;

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

				this.collapseButton(() => {
					focus();
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
			this.collapseButton(() => {
				focus();
			});
		}
		else if(key === 'Tab')
			this.collapseButton();
	};

	//---- Rendering ----
	render() {
		const { children, orientation, menuLabel, menuId, id, setManagerRef } = this.props;
		const { isExpanded } = this.state;

		return (
			<Fragment>
				<button
					type="button"
					aria-haspopup="menu"
					aria-controls={ menuId }
					id={ id }
					aria-expanded={ isExpanded }
					onKeyDown={ this.onKeyDown }
					ref={ setManagerRef }
				>
					{ children }
				</button>
				<Menu
					orientation={ orientation }
					label={ menuLabel }
					labelId={ id }
					id={ menuId }
				>
					{ this.renderItems() }
				</Menu>
			</Fragment>
		);
	}

	renderItems = () => {
		/* eslint-disable react/no-array-index-key */

		const { items, setItemRef, expandedIndex, collapseItem, focus } = this.props;
		const itemNodes = [];
		let position = [ 0 ];
		let flattenedPosition = [ 0 ];
		let flattenedIndex = 0;

		items.forEach((item, i) => {
			const { type, node, children, orientation, label, labelId, isDisabled, isChecked } = item;

			if(type === 'item') {
				position = position.slice(0);
				position[1] = i;
				flattenedPosition = flattenedPosition.slice(0);
				flattenedPosition[1] = flattenedIndex;

				itemNodes.push(
					<MenuItem
						key={ i }
						position={ position }
						flattenedPosition={ flattenedPosition }
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
				position = position.slice(0);
				position[1] = i;
				flattenedPosition = flattenedPosition.slice(0);
				flattenedPosition[1] = flattenedIndex;

				itemNodes.push(
					<ParentMenuItem
						key={ i }
						items={ children }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						collapse={ collapseItem }
						focusRootItem={ focus }
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
				position = position.slice(0);
				position[1] = i;
				flattenedPosition = flattenedPosition.slice(0);
				flattenedPosition[1] = flattenedIndex;

				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						position={ position }
						flattenedPosition={ flattenedPosition }
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
					position[1] = i;
					flattenedPosition = flattenedPosition.slice(0);
					flattenedPosition[1] = flattenedIndex;

					radioNodes.push(
						<MenuItemRadio
							key={ j }
							position={ position }
							flattenedPosition={ flattenedPosition }
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

	//---- Misc. ----
	collapseButton = (callback) => {
		this.setState({
			isExpanded: false,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};

	expandButton = (callback) => {
		this.setState({
			isExpanded: true,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};
}

export default createMenuManager(MenuButton);
