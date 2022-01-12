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

class ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		index: PropTypes.number.isRequired,
		refIndex: PropTypes.number.isRequired,
		level: PropTypes.number.isRequired,
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
		const { items, collapseParent, focusPrevSibling, focusNextMenubarItem } = this.props;
		const { key, target } = event;
		const index = Number.parseInt(target.dataset.index, 10);
		const refIndex = Number.parseInt(target.dataset.refindex, 10);
		const level = Number.parseInt(target.dataset.level, 10);
		const item = items[index];
		const { type } = item;

		console.log(index, refIndex, level, item);
		
		//TODO separators shouldn't be focusable
		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();
			this.focusPrevChild(refIndex);
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();
			this.focusNextChild(refIndex);
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(level === 1) {
				//TODO: naming is just all wrong...
				//we're collapsing the parent of the menuitem executing this
				//event, but we're not focusing the previous sibling of the
				//menuitem executing this event. we're focusing that menuitem's
				//parent's previous sibling
				collapseParent(false, () => {
					focusPrevSibling(this.props.index, true);
				});
			}
			else {
				collapseParent(false, () => {
					this.focus();
				});
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.childItemRefs[index].current.focusFirstChild();
				});
			}
			else {
				//FIXME: this is broken - the next menubar item should be focused,
				//but won't be because we immediately collapse everything after
				//focusing on it. we're currently using the menubar's expandedIndex
				//to determine which sibling to focus on next, so we currently
				//cannot collapse everything first (otherwise we'd lose the expandedIndex
				//state);
				focusNextMenubarItem();
				collapseParent(true);
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'menu') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.childItemRefs[index].current.focusFirstChild();
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
					this.childItemRefs[index].current.focusFirstChild();
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
			children, index, refIndex, level, onKeyDown,
			orientation, label, labelId,
			isExpanded, isDisabled, isTabbable,
		} = this.props;

		console.log(this.props, this.state, this.itemRef, this.childItemRefs);

		return (
			<li role="none">
				<a
					href="#"
					role="menuitem"
					aria-haspopup="menu"
					data-index={ index }
					data-refindex={ refIndex }
					data-level={ level }
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
		const { items, level, focusNextMenubarItem } = this.props;
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
						level={ level + 1 }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						ref={ this.childItemRefs[refIndex] }
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
						level={ level + 1 }
						onKeyDown={ this.onChildKeyDown }
						collapseParent={ this.collapseMenu }
						focusNextMenubarItem={ focusNextMenubarItem }
						orientation={ orientation }
						label={ label }
						labelId={ labelId }
						isExpanded={ refIndex === expandedIndex }
						isDisabled={ isDisabled }
						ref={ this.childItemRefs[refIndex] }
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
						level={ level + 1 }
						onKeyDown={ this.onChildKeyDown }
						isDisabled={ isDisabled }
						ref={ this.childItemRefs[refIndex] }
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
						level={ level + 1 }
						onKeyDown={ this.onChildKeyDown }
						orientation={ orientation }
						ref={ this.childItemRefs[refIndex] }
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
							level={ level + 1 }
							onKeyDown={ this.onChildKeyDown }
							isDisabled={ isDisabled }
							ref={ this.childItemRefs[refIndex] }
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

	//---- Misc. ---
	focus = () => {
		this.itemRef.current.focus();
	};

	focusChild = (index) => {
		this.childItemRefs[index].current.focus();
	};

	focusPrevChild = (refIndex) => {
		let prevIndex = refIndex === 0 ? this.childItemRefs.length - 1 : refIndex - 1;
		let prevRef = this.childItemRefs[prevIndex];
		
		while(this.isSeparatorRef(prevRef) && prevIndex !== refIndex) {
			prevIndex = prevIndex === 0 ? this.childItemRefs.length - 1 : prevIndex - 1;
			prevRef = this.childItemRefs[prevIndex];
		};

		prevRef.current.focus();
	};

	focusNextChild = (refIndex) => {
		let nextIndex = refIndex === this.childItemRefs.length - 1 ? 0 : refIndex + 1;
		let nextRef = this.childItemRefs[nextIndex];

		while(this.isSeparatorRef(nextRef) && nextIndex !== refIndex) {
			nextIndex = nextIndex === this.childItemRefs.length - 1 ? 0 : nextIndex + 1;
			nextRef = this.childItemRefs[nextIndex];
		}

		nextRef.current.focus();
	};

	focusFirstChild = () => {
		this.focusChild(0);
	};

	focusLastChild = () => {
		const { items } = this.props;
		this.focusChild(items.length - 1);
	};

	collapseMenu = (collapseAll, callback) => {
		const { collapseParent } = this.props;

		console.log('in parentmenuitem', this.props.index, this.props.level);

		this.setState({
			expandedIndex: undefined,
		}, () => {
			if(collapseAll)
				collapseParent(true, callback);
			else if(typeof callback === 'function')
				callback();
		});
	};

	isSeparatorRef = (ref) => {
		const { current } = ref;
		return current instanceof HTMLElement && current.getAttribute('role') === 'separator';
	};
}

export default ParentMenuItem;
