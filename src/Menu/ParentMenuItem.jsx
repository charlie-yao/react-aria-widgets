import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';

//HOCs
import createMenuManager from 'src/Menu/createMenuManager';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';
import { renderItems } from 'src/Menu/utils';

class ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		position: PropTypes.arrayOf(PropTypes.number).isRequired,
		flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
		onKeyDown: PropTypes.func.isRequired,
		onClick: PropTypes.func.isRequired,
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
	onChildClick = (event) => {
		const { items, collapse, focusRootItem, expandedIndex, collapseItem, expandItem } = this.props
		const { target } = event;
		const isDisabled = target.getAttribute('aria-disabled') === 'true'; //can't use isDisabled on the item for radigroups
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const flattenedRootIndex = Number.parseInt(flattenedPosition[0], 10);
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

			collapse(true, () => {
				focusRootItem(flattenedRootIndex);
			});
		} 
	};

	onChildKeyDown = (event) => {
		const {
			items, collapse, focusPrevRootItem, focusNextRootItem, focusRootItem, orientation,
			expandItem, focus, focusPrevItem, focusNextItem, focusFirstItem, focusLastItem, focusItemFirstChild,
		} = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const isDisabled = target.getAttribute('aria-disabled') === 'true'; //can't use isDisabled on the item for radiogroups
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const flattenedRootIndex = Number.parseInt(flattenedPosition[0], 10);
		const level = position.length - 1;
		const item = items[index];
		const { type, onActivate } = item;

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
					collapse(true, () => {
						focusNextRootItem(flattenedRootIndex, true);
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
			children, items, position, flattenedPosition, onKeyDown, onClick,
			focusPrevRootItem, focusNextRootItem, focusRootItem,
			orientation, label, labelId, isExpanded, isDisabled, isTabbable,
			setManagerRef, setItemRef, expandedIndex, collapseItem,
		} = this.props;
		const itemNodes = renderItems({
			items,
			setItemRef,
			expandedIndex,
			collapseItem,
			focusRootItem,
			focusPrevRootItem,
			focusNextRootItem,
			position,
			flattenedPosition,
			onChildKeyDown: this.onChildKeyDown,
			onChildClick: this.onChildClick,
		});

		return (
			<li role="none">
				<a
					href="#"
					role="menuitem"
					aria-haspopup="menu"
					data-position={ position }
					data-flattenedposition={ flattenedPosition }
					onKeyDown={ onKeyDown }
					onClick={ onClick }
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
					{ itemNodes }
				</Menu>
			</li>
		);
	}
}

export default createMenuManager(ParentMenuItem);
