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
		const item = items[index];
		const { type } = item;

		console.log(index, item);
		
		//TODO separators shouldn't be focusable
		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusLastChild();
				});
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
				});
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();
			const prevIndex = index === 0 ? items.length - 1 : index - 1;
			const prevItem = items[prevIndex];
			const { type: prevType } = prevItem;

			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: prevIndex,
					expandedIndex: isExpanded && prevType === 'menu' ? prevIndex : undefined,
				};
			}, () => {
				this.itemRefs[prevIndex].current.focus();
			});
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			const nextIndex = index === items.length - 1 ? 0 : index + 1;
			const nextItem = items[nextIndex];
			const { type: nextType } = nextItem;

			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: nextIndex,
					expandedIndex: isExpanded && nextType === 'menu' ? nextIndex : undefined,
				};
			}, () => {
				this.itemRefs[nextIndex].current.focus();
			});
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
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
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
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
			const firstIndex = 0;
			const firstItem = items[firstIndex];
			const { type: firstType } = firstItem;

			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: firstIndex,
					expandedIndex: isExpanded && firstType === 'menu' ? firstIndex : undefined,
				};
			}, () => {
				this.itemRefs[0].current.focus();
			});
		}
		else if(key === 'End') {
			event.preventDefault();
			const lastIndex = items.length - 1;
			const lastItem = items[lastIndex];
			const { type: lastType } = lastItem;

			this.setState(prevState => {
				const { expandedIndex } = prevState;
				const isExpanded = expandedIndex !== undefined && expandedIndex !== null;

				return {
					tabbableIndex: items.length - 1,
					expandedIndex: isExpanded && lastType === 'menu' ? lastIndex : undefined,
				};
			}, () => {
				this.itemRefs[items.length - 1].current.focus();
			});
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
						index={ refIndex }
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
						index={ refIndex }
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
						index={ refIndex }
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
						index={ refIndex }
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
							index={ refIndex }
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
