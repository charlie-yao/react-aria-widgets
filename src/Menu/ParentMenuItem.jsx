import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';
import MenuItem from 'src/Menu/MenuItem';

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
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		isExpanded: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isTabbable: PropTypes.bool,
	};

	static defaultProps = {
		orientation: 'horizontal',
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
		const { items, collapseParent } = this.props;
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
				
			}
			else {
				//collapseParent();
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
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
		}
		else if(key === 'End') {
			event.preventDefault();
		}
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();
		}
		else if(key === 'Tab') {
		}
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}

		/*
		const { orientation } = this.props;
		const { items } = this.state;
		const { key, target } = event;
		const role = target.getAttribute('role');
		const position = target.dataset.position.split(',');
		const level = position.length - 1;
		let index;
		let nextIndex;
		let item;
		let subItems = items; //(sub-)menu that item belongs in

		//TODO this should probably be put inside the setState() calls
		//so that subItems is referencing prevState rather than
		//this.state
		position.forEach((pos, i) => {
			index = Number.parseInt(pos, 10);
			item = subItems[index];

			//Don't do this on the last iteration so we know
			//the subset of items that item belongs in. Otherwise,
			//subItems would  be the children of item (assuming
			//item is a parent menuitem).
			if(i < position.length - 1)
				subItems = item.children;
		});

		console.log(level, index, item, subItems);

		//TODO:
		//- take into account orientation
		//- consolidate logic and move into separate methods?
		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(level > 0) {
				this.setState(prevState => {
					nextIndex = index === 0 ? subItems.length - 1 : index - 1;
					subItems[nextIndex].ref.current.focus();
					return prevState;
				});
			}
			else if(isParentMenuitem(item)) {
				this.setState(prevState => {
					item.isExpanded = true;
					return prevState;
				}, () => {
					item.children[item.children.length - 1].ref.current.focus();
				});
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(level > 0) {
				this.setState(prevState => {
					nextIndex = index === subItems.length - 1 ? 0 : index + 1;
					subItems[nextIndex].ref.current.focus();
					return prevState;
				});
			}
			else if(isParentMenuitem(item)) {
				this.setState(prevState => {
					item.isExpanded = true;
					return prevState;
				}, () => {
					item.children[0].ref.current.focus();
				});
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();

			if(level === 0) {
				//TODO Like with arrow right, also maintain
				//"root expand state"?
				this.setState(prevState => {
					nextIndex = index === 0 ? subItems.length - 1 : index - 1;
					subItems[index].isTabbable = false;
					subItems[index].isExpanded = false;
					subItems[nextIndex].isTabbable = true;
					subItems[nextIndex].ref.current.focus();
					return prevState;
				});
			}
			else if(level === 1) {
				this.setState(prevState => {
					const pos1 = Number.parseInt(position[0], 10);
					const nextIndex = pos1 === 0 ? items.length - 1 : pos1 - 1;
					const nextItem = items[nextIndex];
					const parentMenuitem = items[pos1];

					parentMenuitem.isTabbable = false;
					parentMenuitem.isExpanded = false;
					nextItem.isTabbable = true;
					nextItem.ref.current.focus();

					if(isParentMenuitem(nextItem))
						nextItem.isExpanded = true;

					return prevState;
				});
			}
			else {
				this.setState(prevState => {
					let _items = items;
					let _item;

					position.forEach((pos, i) => {
						const _pos = Number.parseInt(pos, 10);
						_item = _items[_pos];
						_items = _item.children;

						if(i === position.length - 2) {
							_item.isExpanded = false;
							_item.ref.current.focus();
						}
					});

					return prevState;
				});
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(level === 0) {
				this.setState(prevState => {
					//Const wasExpanded = subItems[index].isExpanded;

					nextIndex = index === subItems.length - 1 ? 0 : index + 1;
					subItems[index].isTabbable = false;
					subItems[index].isExpanded = false;
					subItems[nextIndex].isTabbable = true;
					subItems[nextIndex].ref.current.focus();

					//This behavior isn't defined in the authoring prac
					//but is exhibited in the example implementations
					//https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html
					//https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-2/menubar-2.html
					//FIXME: currently broken - what if subItems[nextIndex] isn't a parent menuitem,
					//but the subsequent item is? we lose the "root expanded" state.
					//if(isParentMenu(subItems[nextIndex]) && wasExpanded)
					//	subItems[nextIndex].isExpanded = true;

					return prevState;
				});
			}
			else if(isParentMenuitem(item)) {
				this.setState(prevState => {
					item.isExpanded = true;
					return prevState;
				}, () => {
					item.children[0].ref.current.focus();
				});
			}
			else {
				this.setState(prevState => {
					//Close the submenu and any parent menus
					let _items = items;
					let _menuitem;

					position.forEach((pos, i) => {
						const _pos = Number.parseInt(pos, 10);
						position[i] = _pos;
						_menuitem = _items[_pos];
						_items = _menuitem.children;

						if(isParentMenuitem(_menuitem))
							_menuitem.isExpanded = false;
					});

					//Move focus to the next menuitem in the menubar,
					//and if it's a parent menuitem, open the submenu
					//without changing focus
					const index = position[0];
					const nextIndex = index === items.length - 1 ? 0 : index + 1;
					const nextItem = items[nextIndex];
					const item = items[index];

					item.isTabbable = false;
					nextItem.isTabbable = true;
					nextItem.ref.current.focus();

					if(isParentMenuitem(nextItem))
						nextItem.isExpanded = true;

					return prevState;
				});
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(isParentMenuitem(item)) {
				this.setState(prevState => {
					item.isExpanded = true;
					return prevState;
				}, () => {
					item.children[0].ref.current.focus();
				});
			}
			else {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();

			if(isParentMenuitem(item)) {
				this.setState(prevState => {
					item.isExpanded = true;
					return prevState;
				}, () => {
					item.children[0].ref.current.focus();
				});
			}
			else if(role === 'menuitemcheckbox') {
				//TODO: change state without closing the menu
			}
			else if(role === 'menuitemradio') {
				//TODO change state without closing the menu
			}
			else {
				//TODO: activate the item and closes the (whole?) menu
			}
		}
		else if(key === 'Home') {
			event.preventDefault();

			this.setState(prevState => {
				nextIndex = 0;

				if(level === 0) {
					subItems[index].isTabbable = false;
					subItems[nextIndex].isTabbable = true;
				}

				subItems[nextIndex].ref.current.focus();
				return prevState;
			});
		}
		else if(key === 'End') {
			event.preventDefault();

			this.setState(prevState => {
				nextIndex = subItems.length - 1;

				if(level === 0) {
					subItems[index].isTabbable = false;
					subItems[nextIndex].isTabbable = true;
				}

				subItems[nextIndex].ref.current.focus();
				return prevState;
			});
		}
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();

			if(level > 0) {
				this.setState(prevState => {
					let _items = items;
					let _item;

					position.forEach((pos, i) => {
						const _pos = Number.parseInt(pos, 10);
						_item = _items[_pos];
						_items = _item.children;

						if(i === position.length - 2) {
							_item.isExpanded = false;
							_item.ref.current.focus();
						}
					});

					return prevState;
				});
			}
		}
		else if(key === 'Tab') {
			this.setState(prevState => {
				let _items = items;
				let _item;

				position.forEach(pos => {
					const _pos = Number.parseInt(pos, 10);
					_item = _items[_pos];
					_items = _item.children;

					//FIXME: broken in both directions. shift+tab goes to the
					//root item rather than the element before the menubar.
					//Tabbing forward seems to focus on some unknown "thing"
					//rather than something on the browser (though that only
					//seems to occur if the menubar is NOT the last element).
					//This behavior does not show up on the WAI-ARIA example
					//implementations so it's likely something we're doing.
					//_item.isTabbable = i === 0;
					_item.isExpanded = false;
				});

				return prevState;
			});
		}
		else {
			//TODO: Any key that corresponds to a printable character (Optional):
			//Move focus to the next menu item in the current menu whose label begins
			//with that printable character.
		}
		*/
	};

	//---- Rendering ----
	render() {
		const {
			children, items, index, level, onKeyDown,
			orientation, isExpanded, isDisabled, isTabbable,
		} = this.props;
		const itemNodes = items.map(this.renderItem);

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
				<Menu orientation={ orientation }>
					{ itemNodes }
				</Menu>
			</li>
		);
	}

	renderItem = (item, index) => {
		const { level } = this.props;
		const { node, type, children, orientation, isDisabled } = item;
		const { expandedIndex } = this.state;

		if(type === 'menuitem') {
			return (
				<MenuItem
					key={ index }
					index={ index }
					level={ level + 1 }
					onKeyDown={ this.onChildKeyDown }
					collapseParent={ this.collapseMenu }
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
					orientation={ orientation }
					isExpanded={ index === expandedIndex }
					isDisabled={ isDisabled }
					ref={ this.childItemRefs[index] }
				>
					{ node }
				</ParentMenuItem>
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

	collapseMenu = () => {
		this.setState({
			expandedIndex: undefined,
		});
	};
}

export default ParentMenuItem;

//TODO: this is straying further and further away
//from the idea of a "base" component - might be a good
//idea to separate the opinionated stuff I'm adding on?
/*
const ParentMenuItem = React.forwardRef(function ParentMenuItem(props, ref) {
	const {
		children, items, isExpanded, isDisabled, isTabbable,
		orientation, renderItem, onKeyDown, position,
	} = props;
	const itemNodes = items.map((item, index, _items) => {
		return renderItem(item, index, _items, props, onKeyDown);
	});

	return (
		<li role="none">
			<a
				href="#"
				role="menuitem"
				aria-haspopup="menu"
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				tabIndex={ isTabbable ? '0' : '-1' }
				ref={ ref }
				onKeyDown={ onKeyDown }
				data-position={ position.toString() }
			>
				{ children }
			</a>
			<Menu orientation={ orientation }>
				{ itemNodes }
			</Menu>
		</li>
	);
});

ParentMenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	items: MENU_ITEMS_PROPTYPE.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isTabbable: PropTypes.bool,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
	renderItem: PropTypes.func,
	renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	isTabbable: false,
	orientation: 'horizontal',
	renderItem,
	renderMenuItem,
	renderParentMenuItem,
};

export default ParentMenuItem;
*/
