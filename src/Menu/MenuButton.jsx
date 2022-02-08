import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';

//HOCs
import createMenuButtonManager from 'src/Menu/createMenuButtonManager';
import createMenuManager from 'src/Menu/createMenuManager';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';
import { renderItems } from 'src/Menu/utils';

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
		//From MenuButtonManager
		isExpanded: PropTypes.bool.isRequired,
		collapse: PropTypes.func.isRequired,
		expand: PropTypes.func.isRequired,
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

	//---- Events ----
	onClick = () => {
		const { isExpanded, collapse, expand } = this.props;

		if(isExpanded)
			collapse();
		else
			expand();
	};

	onKeyDown = (event) => {
		const { expand, focusFirstItem, focusLastItem } = this.props;
		const { key } = event;

		if(key === 'Enter' || key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			expand(() => {
				focusFirstItem();
			});
		}
		else if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			expand(() => {
				focusLastItem();
			});
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			expand(() => {
				focusFirstItem();
			});
		}
	};

	onChildClick = (event) => {
		const { items, expandedIndex, collapseItem, expandItem } = this.props
		const { target } = event;
		const isDisabled = target.getAttribute('aria-disabled') === 'true'; //can't use isDisabled on the item for radigroups
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const item = items[index];
		const { type, onActivate } = item;

		if(type === 'menu') {
			if(expandedIndex === flattenedIndex)
				collapseItem();
			else
				expandItem(flattenedIndex);
		}
		else if(type === 'checkbox') {
		}
		else if(type === 'radiogroup') {
		}
		else if(type === 'item') {
		}
	};

	onChildKeyDown = (event) => {
		const {
			items, orientation, collapse,
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

				collapse(false, () => {
					focus();
				});
			}
			else if(type === 'radiogroup') {
				if(typeof onActivate === 'function')
					onActivate(event);

				collapse(false, () => {
					focus();
				});
			}
			else if(type === 'item') {
				if(typeof onActivate === 'function')
					onActivate(event);

				collapse(false, () => {
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

				collapse(false, () => {
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
			collapse(false, () => {
				focus();
			});
		}
		else if(key === 'Tab')
			collapse();
	};

	//---- Rendering ----
	render() {
		const {
			children, items, orientation, menuLabel, menuId, id, isExpanded,
			setManagerRef, setItemRef, expandedIndex, collapseItem, focus,
		} = this.props;
		const itemNodes = renderItems({
			items,
			setItemRef,
			expandedIndex,
			collapseItem,
			focusRootItem: focus,
			position: [ 0 ],
			flattenedPosition: [ 0 ],
			onChildKeyDown: this.onChildKeyDown,
			onChildClick: this.onChildClick,
		});

		return (
			<Fragment>
				<button
					type="button"
					aria-haspopup="menu"
					aria-controls={ menuId }
					id={ id }
					aria-expanded={ isExpanded }
					onKeyDown={ this.onKeyDown }
					onClick={ this.onClick }
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
					{ itemNodes }
				</Menu>
			</Fragment>
		);
	}
}

export default createMenuButtonManager(createMenuManager(MenuButton));
