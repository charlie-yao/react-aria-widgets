import React from 'react';
import PropTypes from 'prop-types';

//HOCs
import createMenuManager from 'src/Menu/createMenuManager';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';
import { renderItems } from 'src/Menu/utils';

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
		//From MenuManager
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
		else if(type === 'checkbox' || type === 'radiogroup' || type === 'item') {
			if(isDisabled)
				return;

			if(typeof onActivate === 'function')
				onActivate(event);
		}
	};

	onChildKeyDown = (event) => {
		const {
			items, orientation,
			collapseItem, expandItem, focusPrevItem, focusNextItem, focusFirstItem, focusLastItem,
			focusItemFirstChild, focusItemLastChild,
		} = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const isDisabled = target.getAttribute('aria-disabled') === 'true'; //can't use isDisabled on the item for radigroups
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const item = items[index];
		const { type, onActivate } = item;

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

	onChildOver = (event) => {
		const { items, expandedIndex, expandItem, focusItem } = this.props;
		const { target } = event;

		console.log(target);

		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const item = items[index];
		const { type } = item;
		
		focusItem(flattenedIndex);

		if(type === 'menu' && expandedIndex !== -1)
			expandItem(flattenedIndex);
	};

	onChildLeave = () => {
	};

	//---- Rendering ----
	render() {
		const {
			items, orientation, label, labelId,
			setItemRef, tabbableIndex, expandedIndex, collapseItem, focusItem, focusPrevItem, focusNextItem,
		} = this.props;
		const itemNodes = renderItems({
			items,
			setItemRef,
			tabbableIndex,
			expandedIndex,
			collapseItem,
			focusRootItem: focusItem,
			focusPrevRootItem: focusPrevItem,
			focusNextRootItem: focusNextItem,
			position: [],
			flattenedPosition: [],
			onChildKeyDown: this.onChildKeyDown,
			onChildClick: this.onChildClick,
			onChildOver: this.onChildOver,
			onChildLeave: this.onChildLeave,
		});

		return (
			<ul
				role="menubar"
				aria-orientation={ orientation }
				aria-labelledby={ labelId }
				aria-label={ label }
			>
				{ itemNodes }
			</ul>
		);
	}
}

export default createMenuManager(MenuBar);
