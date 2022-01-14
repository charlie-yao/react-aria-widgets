import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';
import { isSeparatorRef } from 'src/Menu/utils';

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
	};

	static defaultProps = {
		orientation: 'horizontal',
		label: undefined,
		labelId: undefined,
	};

	constructor(props) {
		super(props);

		const { items } = props;

		this.state = {
			tabbableIndex: 0,
			expandedIndex: undefined,
		};

		this.itemRefs = [];

		items.forEach(item => {
			const { type, children } = item;

			if(type === 'radiogroup') {
				children.forEach(() => {
					this.itemRefs.push(React.createRef());
				});
			}
			else
				this.itemRefs.push(React.createRef());
		});
	}

	//---- Events ----
	onChildKeyDown = (event) => {
		const { items, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const item = items[index];
		const { type } = item;

		console.log(position, flattenedPosition, index, flattenedIndex, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'horizontal') {
				if(type === 'menu') {
					this.expandMenu(flattenedIndex, () => {
						this.itemRefs[flattenedIndex].current.focusLastChild();
					});
				}
			}
			else
				this.focusPrevChild(flattenedIndex);
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();
			
			if(orientation === 'horizontal') {
				if(type === 'menu') {
					this.expandMenu(flattenedIndex, () => {
						this.itemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
			}
			else
				this.focusNextChild(flattenedIndex);
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(orientation === 'horizontal')
				this.focusPrevChild(flattenedIndex);
			else {
				if(type === 'menu') {
					this.expandMenu(flattenedIndex, () => {
						this.itemRefs[flattenedIndex].current.focusLastChild();
					});
				}
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(orientation === 'horizontal')
				this.focusNextChild(flattenedIndex);
			else {
				if(type === 'menu') {
					this.expandMenu(flattenedIndex, () => {
						this.itemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.expandMenu(flattenedIndex, () => {
					this.itemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(type === 'menu') {
				this.expandMenu(flattenedIndex, () => {
					this.itemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else if(type === 'checkbox') {
				//TODO change state without closing the menu
			}
			else if(type === 'radiogroup') {
				//TODO change state without closing the menu
			}
			else if(type === 'item') {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === 'Home') {
			event.preventDefault();
			this.focusFirstChild();
		}
		else if(key === 'End') {
			event.preventDefault();
			this.focusLastChild();
		}
		else if(key === 'Tab')
			this.collapseMenu();
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}
	};

	//---- Rendering ----
	render() {
		const { orientation, label, labelId } = this.props;

		//console.log(this.props, this.state, this.itemRefs);

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
		const { items, orientation: parentOrientation } = this.props;
		const { tabbableIndex, expandedIndex } = this.state;
		const itemNodes = [];
		let position = [];
		let flattenedPosition = [];
		let flattenedIndex = 0;

		items.forEach((item, i) => {
			const { type, node, children, orientation, label, labelId, isDisabled } = item;

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
						ref={ this.itemRefs[flattenedIndex] }
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
						collapseParent={ this.collapseMenu }
						focusPrevSibling={ this.focusPrevChild }
						focusNextSibling={ this.focusNextChild }
						focusNextMenubarItem={ this.focusNextChild }
						parentOrientation={ parentOrientation }
						orientation={ orientation }
						label={ label }
						labelId={ labelId }
						isDisabled={ isDisabled }
						isExpanded={ flattenedIndex === expandedIndex }
						isTabbable={ flattenedIndex === tabbableIndex }
						ref={ this.itemRefs[flattenedIndex] }
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

				//TODO isChecked?
				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						position={ position }
						flattenedPosition={ flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						isTabbable={ flattenedIndex === tabbableIndex }
						ref={ this.itemRefs[flattenedIndex] }
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
						ref={ this.itemRefs[flattenedIndex] }
					>
						{ node }
					</MenuItemSeparator>
				);

				flattenedIndex++;
			}
			else if(type === 'radiogroup') {
				const radioNodes = [];

				children.forEach((radioItem, j) => {
					const { node, isDisabled } = radioItem;

					position = position.slice(0);
					position[0] = i;
					flattenedPosition = flattenedPosition.slice(0);
					flattenedPosition[0] = flattenedIndex;
				
					//TODO isChecked?
					radioNodes.push(
						<MenuItemRadio
							key={ j }
							subIndex={ j }
							position={ position }
							flattenedPosition={ flattenedPosition }
							onKeyDown={ this.onChildKeyDown }
							isDisabled={ isDisabled }
							isTabbable={ flattenedIndex === tabbableIndex }
							ref={ this.itemRefs[flattenedIndex] }
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
	};

	//---- Misc. ----
	collapseMenu = (collapseAll, callback) => {
		console.log('in menubar');

		this.setState({
			expandedIndex: undefined,
		}, () => {
			if(typeof callback === 'function')
				callback();
		});
	};

	expandMenu = (flattenedIndex, callback) => {
		this.setState({
			expandedIndex: flattenedIndex,
		}, () => {
			if(callback && typeof callback === 'function')
				callback();
		});
	};

	focusPrevChild = (flattenedIndex, autoExpand = false) => {
		let prevIndex = flattenedIndex === 0 ? this.itemRefs.length - 1 : flattenedIndex - 1;
		let prevRef = this.itemRefs[prevIndex];
		
		//TODO test edge cases, e.g. single-element separator and single-element non-separator?
		while(isSeparatorRef(prevRef) && prevIndex !== flattenedIndex) {
			prevIndex = prevIndex === 0 ? this.itemRefs.length - 1 : prevIndex - 1;
			prevRef = this.itemRefs[prevIndex];
		}

		this.setState(state => {
			const { expandedIndex } = state;
			const wasExpanded = expandedIndex !== undefined && expandedIndex !== null;
			const _autoExpand = prevRef.current instanceof ParentMenuItem && (wasExpanded || autoExpand);
			
			//TODO would be nice if there was a better way to map ref indices to item indices
			//and vice-versa, checking instanceof ParentMenuItem almost feels sort of abusive
			//wrt using refs
			return {
				tabbableIndex: prevIndex,
				expandedIndex: _autoExpand ? prevIndex : undefined,
			};
		}, () => {
			prevRef.current.focus();
		});
	};
	
	focusNextChild = (flattenedIndex, autoExpand = false) => {
		console.log('<MenuBar> - focusNextChild()');

		let nextIndex = flattenedIndex === this.itemRefs.length - 1 ? 0 : flattenedIndex + 1;
		let nextRef = this.itemRefs[nextIndex];

		while(isSeparatorRef(nextRef) && nextIndex !== flattenedIndex) {
			nextIndex = nextIndex === this.itemRefs.length - 1 ? 0 : nextIndex + 1;
			nextRef = this.itemRefs[nextIndex];
		}

		this.setState(state => {
			const { expandedIndex } = state;
			const wasExpanded = expandedIndex !== undefined && expandedIndex !== null;
			const _autoExpand = nextRef.current instanceof ParentMenuItem && (wasExpanded || autoExpand);

			return {
				tabbableIndex: nextIndex,
				expandedIndex: _autoExpand ? nextIndex : undefined,
			};
		}, () => {
			nextRef.current.focus();
		});
	};

	focusFirstChild = () => {
		this.focusNextChild(this.itemRefs.length - 1);
	};

	focusLastChild = () => {
		this.focusPrevChild(0);
	};
}

export default MenuBar;
