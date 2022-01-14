import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';
import MenuItemRadioGroup from 'src/Menu/MenuItemRadioGroup';
import MenuItemRadio from 'src/Menu/MenuItemRadio';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';
import { isSeparatorRef } from 'src/Menu/utils';

class ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		position: PropTypes.arrayOf(PropTypes.number).isRequired,
		flattenedPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
		onKeyDown: PropTypes.func.isRequired,
		collapseParent: PropTypes.func.isRequired,
		focusPrevSibling: PropTypes.func.isRequired,
		focusNextMenubarItem: PropTypes.func.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		isExpanded: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isTabbable: PropTypes.bool,
	};

	static defaultProps = {
		orientation: 'horizontal',
		label: undefined,
		labelId: undefined,
		isExpanded: false,
		isDisabled: false,
		isTabbable: false,
	};

	constructor(props) {
		super(props);

		const { items } = props;

		this.state = {
			expandedIndex: undefined,
		};

		this.itemRef = React.createRef();
		this.childItemRefs = [];

		items.forEach(item => {
			const { type, children } = item;

			if(type === 'radiogroup') {
				children.forEach(() => {
					this.childItemRefs.push(React.createRef());
				});
			}
			else
				this.childItemRefs.push(React.createRef());
		});
	}

	//---- Events ----
	onChildKeyDown = (event) => {
		const { items, collapseParent, focusPrevSibling, focusNextMenubarItem, orientation } = this.props;
		const { key, target } = event;
		const position = target.dataset.position.split(',');
		const flattenedPosition = target.dataset.flattenedposition.split(',');
		const index = Number.parseInt(position[position.length - 1], 10);
		const flattenedIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 1], 10);
		const level = position.length - 1;
		const item = items[index];
		const { type } = item;

		console.log(position, flattenedPosition, index, flattenedIndex, level, item);
		
		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(orientation === 'vertical')
				this.focusPrevChild(flattenedIndex);
			else {
				if(level === 1) {
					//TODO: naming is just all wrong...
					//we're collapsing the parent of the menuitem executing this
					//event, but we're not focusing the previous sibling of the
					//menuitem executing this event. we're focusing that menuitem's
					//parent's previous sibling
					collapseParent(false, () => {
						const flatParentIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 2], 10);
						focusPrevSibling(flatParentIndex, true);
					});
				}
				else {
					collapseParent(false, () => {
						this.focus();
					});
				}
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(orientation === 'vertical')
				this.focusNextChild(flattenedIndex);
			else {
				if(type === 'menu') {
					this.setState({
						expandedIndex: flattenedIndex,
					}, () => {
						this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
				else {
					collapseParent(true, () => {
						const flatMenubarIndex = Number.parseInt(flattenedPosition[0], 10);
						focusNextMenubarItem(flatMenubarIndex, true);
					});
				}
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();
			
			if(orientation === 'vertical') {
				if(level === 1) {
					//TODO: naming is just all wrong...
					//we're collapsing the parent of the menuitem executing this
					//event, but we're not focusing the previous sibling of the
					//menuitem executing this event. we're focusing that menuitem's
					//parent's previous sibling
					collapseParent(false, () => {
						const flatParentIndex = Number.parseInt(flattenedPosition[flattenedPosition.length - 2], 10);
						focusPrevSibling(flatParentIndex, true);
					});
				}
				else {
					collapseParent(false, () => {
						this.focus();
					});
				}
			}
			else
				this.focusPrevChild(flattenedIndex);
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			
			if(orientation === 'vertical') {
				if(type === 'menu') {
					this.setState({
						expandedIndex: flattenedIndex,
					}, () => {
						this.childItemRefs[flattenedIndex].current.focusFirstChild();
					});
				}
				else {
					collapseParent(true, () => {
						const flatMenubarIndex = Number.parseInt(flattenedPosition[0], 10);
						focusNextMenubarItem(flatMenubarIndex, true);
					});
				}
			}
			else
				this.focusNextChild(flattenedIndex);
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: flattenedIndex,
				}, () => {
					this.childItemRefs[flattenedIndex].current.focusFirstChild();
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
					expandedIndex: flattenedIndex,
				}, () => {
					this.childItemRefs[flattenedIndex].current.focusFirstChild();
				});
			}
			else if(type === 'checbox') {
				//TODO change state without closing the menu
			}
			else if(type === 'radiogroup') {
				//TODO change state without closing the menu
			}
			else if(type === 'item') {
				//TODO activate the item and close the whole menu
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
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();

			collapseParent(false, () => {
				this.focus();
			});
		}
		else if(key === 'Tab')
			collapseParent(true);
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}
	};

	//---- Rendering ----
	render() {
		const {
			children, position, flattenedPosition, onKeyDown,
			orientation, label, labelId,
			isExpanded, isDisabled, isTabbable,
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
					ref={ this.itemRef }
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
		const { items, focusNextMenubarItem, position, flattenedPosition } = this.props;
		const { tabbableIndex, expandedIndex } = this.state;
		const level = position.length;
		const itemNodes = [];
		let _position = [];
		let _flattenedPosition = [];
		let flattenedIndex = 0;

		items.forEach((item, i) => {
			const { type, node, children, orientation, label, labelId, isDisabled } = item;
			
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
						ref={ this.childItemRefs[flattenedIndex] }
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
						collapseParent={ this.collapseMenu }
						focusNextMenubarItem={ focusNextMenubarItem }
						orientation={ orientation }
						label={ label }
						labelId={ labelId }
						isExpanded={ flattenedIndex === expandedIndex }
						isDisabled={ isDisabled }
						ref={ this.childItemRefs[flattenedIndex] }
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

				//TODO isChecked?
				itemNodes.push(
					<MenuItemCheckbox
						key={ i }
						position={ _position }
						flattenedPosition={ _flattenedPosition }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
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
						ref={ this.childItemRefs[flattenedIndex] }
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
	
					_position = position.slice(0);
					_position[level] = i;
					_flattenedPosition = flattenedPosition.slice(0);
					_flattenedPosition[level] = flattenedIndex;

					//TODO isChecked?
					radioNodes.push(
						<MenuItemRadio
							key={ j }
							subIndex={ j }
							position={ _position }
							flattenedPosition={ _flattenedPosition }
							onKeyDown={ this.onChildKeyDown }
							isDisabled={ isDisabled }
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
	};

	//---- Misc. ---
	focus = () => {
		this.itemRef.current.focus();
	};

	focusPrevChild = (flattenedIndex) => {
		let prevIndex = flattenedIndex === 0 ? this.childItemRefs.length - 1 : flattenedIndex - 1;
		let prevRef = this.childItemRefs[prevIndex];
		
		while(isSeparatorRef(prevRef) && prevIndex !== flattenedIndex) {
			prevIndex = prevIndex === 0 ? this.childItemRefs.length - 1 : prevIndex - 1;
			prevRef = this.childItemRefs[prevIndex];
		};

		prevRef.current.focus();
	};

	focusNextChild = (flattenedIndex) => {
		let nextIndex = flattenedIndex === this.childItemRefs.length - 1 ? 0 : flattenedIndex + 1;
		let nextRef = this.childItemRefs[nextIndex];

		while(isSeparatorRef(nextRef) && nextIndex !== flattenedIndex) {
			nextIndex = nextIndex === this.childItemRefs.length - 1 ? 0 : nextIndex + 1;
			nextRef = this.childItemRefs[nextIndex];
		}

		nextRef.current.focus();
	};

	focusFirstChild = () => {
		this.focusNextChild(this.childItemRefs.length - 1);
	};

	focusLastChild = () => {
		this.focusPrevChild(0);
	};

	collapseMenu = (collapseAll, callback) => {
		const { collapseParent } = this.props;

		this.setState({
			expandedIndex: undefined,
		}, () => {
			if(collapseAll)
				collapseParent(true, callback);
			else if(typeof callback === 'function')
				callback();
		});
	};
}

export default ParentMenuItem;
