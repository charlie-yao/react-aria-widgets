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
		const { items } = this.props;
		const { key, target } = event;
		const index = Number.parseInt(target.dataset.index, 10);
		const refIndex = Number.parseInt(target.dataset.refindex, 10);
		const item = items[index];
		const { type } = item;

		console.log(index, refIndex, item);
		
		//TODO separators shouldn't be focusable
		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: refIndex,
				}, () => {
					this.itemRefs[refIndex].current.focusLastChild();
				});
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: refIndex,
				}, () => {
					this.itemRefs[refIndex].current.focusFirstChild();
				});
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();
			this.focusPrevChild(refIndex);
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			this.focusNextChild(refIndex);
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: refIndex,
				}, () => {
					this.itemRefs[refIndex].current.focusFirstChild();
				});
			}
			else {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: refIndex,
				}, () => {
					this.itemRefs[refIndex].current.focusFirstChild();
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

		console.log(this.props, this.state, this.itemRefs);

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
		const { items } = this.props;
		const { tabbableIndex, expandedIndex } = this.state;
		const itemNodes = [];
		let refIndex = 0;

		items.forEach((item, i) => {
			const { type, node, children, orientation, label, labelId, isDisabled } = item;
			
			if(type === 'item') {
				itemNodes.push(
					<MenuItem
						key={ i }
						index={ i }
						refIndex={ refIndex }
						level={ 0 }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						isTabbable={ refIndex === tabbableIndex }
						ref={ this.itemRefs[refIndex] }
					>
						{ node }
					</MenuItem>
				);

				refIndex++;
			}
			else if(type === 'menu') {
				itemNodes.push(
					<ParentMenuItem
						key={ i }
						items={ children }
						index={ i }
						refIndex={ refIndex }
						level={ 0 }
						onKeyDown={ this.onChildKeyDown }
						collapseParent={ this.collapseMenu }
						focusPrevSibling={ this.focusPrevSibling }
						focusNextMenubarItem={ this.focusNextSibling }
						orientation={ orientation }
						label={ label }
						labelId={ labelId }
						isDisabled={ isDisabled }
						isExpanded={ refIndex === expandedIndex }
						isTabbable={ refIndex === tabbableIndex }
						ref={ this.itemRefs[refIndex] }
					>
						{ node }
					</ParentMenuItem>
				);

				refIndex++;
			}
			else if(type === 'checkbox') {
				//TODO isChecked?
				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						index={ i }
						refIndex={ refIndex }
						level={ 0 }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						isTabbable={ refIndex === tabbableIndex }
						ref={ this.itemRefs[index] }
					>
						{ node }
					</MenuItemCheckbox>
				);

				refIndex++;
			}
			else if(type === 'separator') {
				itemNodes.push(
					<MenuItemSeparator
						key={ i }
						index={ i }
						refIndex={ refIndex }
						level={ 0 }
						onKeyDown={ this.onChildKeyDown }
						orientation={ orientation }
						ref={ this.itemRefs[refIndex] }
					>
						{ node }
					</MenuItemSeparator>
				);

				refIndex++;
			}
			else if(type === 'radiogroup') {
				const radioNodes = [];

				children.forEach((radioItem, j) => {
					const { node, isDisabled } = radioItem;
					
					//TODO isChecked?
					radioNodes.push(
						<MenuItemRadio
							key={ j }
							index={ i }
							refIndex={ refIndex }
							subIndex={ j }
							level={ 0 }
							onKeyDown={ this.onChildKeyDown }
							isDisabled={ isDisabled }
							isTabbable={ refIndex === tabbableIndex }
							ref={ this.itemRefs[refIndex] }
						>
							{ node }
						</MenuItemRadio>
					);

					refIndex++;
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

	focusPrevChild = (refIndex) => {
		let prevIndex = refIndex === 0 ? this.itemRefs.length - 1 : refIndex - 1;
		let prevRef = this.itemRefs[prevIndex];
		
		//TODO test edge cases, e.g. single-element separator and single-element non-separator?
		while(isSeparatorRef(prevRef) && prevIndex !== refIndex) {
			prevIndex = prevIndex === 0 ? this.itemRefs.length - 1 : prevIndex - 1;
			prevRef = this.itemRefs[prevIndex];
		}

		this.setState(state => {
			const { expandedIndex } = state;
			const wasExpanded = expandedIndex !== undefined && expandedIndex !== null;
			
			//TODO would be nice if there was a better way to map ref indices to item indices
			//and vice-versa, checking instanceof ParentMenuItem almost feels sort of abusive
			//wrt using refs
			return {
				tabbableIndex: prevIndex,
				expandedIndex: prevRef.current instanceof ParentMenuItem && wasExpanded ? prevIndex : undefined,
			};
		}, () => {
			prevRef.current.focus();
		});
	};
	
	focusNextChild = (refIndex) => {
		let nextIndex = refIndex === this.itemRefs.length - 1 ? 0 : refIndex + 1;
		let nextRef = this.itemRefs[nextIndex];

		while(isSeparatorRef(nextRef) && nextIndex !== refIndex) {
			nextIndex = nextIndex === this.itemRefs.length - 1 ? 0 : nextIndex + 1;
			nextRef = this.itemRefs[nextIndex];
		}

		this.setState(state => {
			const { expandedIndex } = state;
			const wasExpanded = expandedIndex !== undefined && expandedIndex !== null;

			return {
				tabbableIndex: nextIndex,
				expandedIndex: nextRef.current instanceof ParentMenuItem && wasExpanded ? nextIndex : undefined,
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

	focusPrevSibling = (index, autoExpand) => {
		const { items } = this.props;
		const prevIndex = index === 0 ? items.length - 1 : index - 1;

		this.setState({
			tabbableIndex: prevIndex,
			expandedIndex: autoExpand ? prevIndex : undefined,
		}, () => {
			this.itemRefs[prevIndex].current.focus();
		});
	};

	//TODO not very flexible, assuming the current index is
	//what is currently expanded...
	focusNextSibling = () => {
		const { items } = this.props;
		const { expandedIndex } = this.state;
		const nextIndex = expandedIndex === items.length - 1 ? 0 : expandedIndex + 1;

		console.log(expandedIndex, nextIndex);

		this.setState({
			tabbableIndex: nextIndex,
			expandedIndex: nextIndex,
		}, () => {
			this.itemRefs[nextIndex].current.focus();
		});
	};
}

export default MenuBar;
