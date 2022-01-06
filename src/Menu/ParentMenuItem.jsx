import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';
import MenuItemCheckbox from 'src/Menu/MenuItemCheckbox';
import MenuItemSeparator from 'src/Menu/MenuItemSeparator';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';

class ParentMenuItem extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENU_ITEMS_PROPTYPE.isRequired,
		index: PropTypes.number.isRequired,
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
		this.childItemRefs = items.map(() => React.createRef());
	}

	//---- Events ----
	onChildKeyDown = (event) => {
		const { items, collapseParent, focusPrevSibling, focusNextMenubarItem } = this.props;
		const { key, target } = event;
		const index = Number.parseInt(target.dataset.index, 10);
		const level = Number.parseInt(target.dataset.level, 10);
		const item = items[index];
		const { type } = item;

		console.log(index, level);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();
			const newIndex = index === 0 ? items.length - 1 : index - 1;
			this.focusChild(newIndex);
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();
			const newIndex = index === items.length - 1 ? 0 : index + 1;
			this.focusChild(newIndex);
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

			if(type === 'parentmenuitem') {
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

			if(type === 'parentmenuitem') {
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

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.childItemRefs[index].current.focusFirstChild();
				});
			}
			else if(type === 'menuitemchecbox') {
				//TODO change state without closing the menu
			}
			else if(type === 'menuitemradio') {
				//TODO change state without closing the menu
			}
			else if(type === 'menuitem') {
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
		else if(key === 'Tab') {
			collapseParent(true);
		}
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}
	};

	//---- Rendering ----
	render() {
		const {
			children, items, index, level, onKeyDown,
			orientation, label, labelId,
			isExpanded, isDisabled, isTabbable,
		} = this.props;
		const itemNodes = items.map(this.renderItem);

		console.log(this.props, this.state);

		return (
			<li role="none">
				<a
					href="#"
					role="menuitem"
					aria-haspopup="menu"
					data-index={ index }
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
					{ itemNodes }
				</Menu>
			</li>
		);
	}

	renderItem = (item, index) => {
		const { level, focusNextMenubarItem } = this.props;
		const { node, type, children, orientation, label, labelId, isDisabled } = item;
		const { expandedIndex } = this.state;

		if(type === 'menuitem') {
			return (
				<MenuItem
					key={ index }
					index={ index }
					level={ level + 1 }
					onKeyDown={ this.onChildKeyDown }
					isDisabled={ isDisabled }
					ref={ this.childItemRefs[index] }
				>
					{ node }
				</MenuItem>
			);
		}
		else if(type === 'parentmenuitem') {
			return (
				<ParentMenuItem
					key={ index }
					items={ children }
					index={ index }
					level={ level + 1 }
					onKeyDown={ this.onChildKeyDown }
					collapseParent={ this.collapseMenu }
					focusNextMenubarItem={ focusNextMenubarItem }
					orientation={ orientation }
					label={ label }
					labelId={ labelId }
					isExpanded={ index === expandedIndex }
					isDisabled={ isDisabled }
					ref={ this.childItemRefs[index] }
				>
					{ node }
				</ParentMenuItem>
			);
		}
		else if(type === 'menuitemcheckbox') {
			return (
				<MenuItemCheckbox
					key={ index }
					index={ index }
					level={ level + 1 }
					onKeyDown={ this.onChildKeyDown }
					isDisabled={ isDisabled }
					ref={ this.childItemRefs[index] }
				>
					{ node }
				</MenuItemCheckbox>
			);
		}
		else if(type === 'separator') {
			return (
				<MenuItemSeparator key={ index } orientation={ orientation }>
					{ node }
				</MenuItemSeparator>
			);
		}
	};

	//---- Misc. ---
	focus = () => {
		this.itemRef.current.focus();	
	};

	focusChild = (index) => {
		this.childItemRefs[index].current.focus();
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
}

export default ParentMenuItem;
