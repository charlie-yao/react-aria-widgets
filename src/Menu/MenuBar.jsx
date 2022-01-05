import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';

/*
 * Some notes on props:
 *
 * - If the menubar has a visible label, a labelId prop that points towards
 * the labeling element should be provided. Otherwise, one should pass in
 * a label via the label prop. In other words, one XOR the other must be provided.
 */
class MenuBar extends React.Component {
	static propTypes = {
		items: MENU_ITEMS_PROPTYPE.isRequired,
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

		//TODO: feels incredibly awkward, e.g.:
		//- refs in state?
		//- what if someone passes new props (e.g. change isDisabled for an item)?
		//- are we updating state properly? deep copy/nested weirdness?
		this.state = {
			tabbableIndex: 0,
			expandedIndex: undefined,
		};

		this.itemRefs = items.map(() => React.createRef());
	}

	//---- Events ----
	onChildKeyDown = (event) => {
		//TODO
		//- orientation
		//- abstract away setState calls? 
		const { items } = this.props;
		const { key, target } = event;
		const index = Number.parseInt(target.dataset.index, 10);
		const item = items[index];
		const { type } = item;

		console.log(index, item);

		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusLastChild();
				});
			}
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
				});
			}
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();
			const nextIndex = index === 0 ? items.length - 1 : index - 1;
			
			this.setState({
				tabbableIndex: nextIndex,
				expandedIndex: undefined, //TODO WAI-ARIA implementation maintains this
			}, () => {
				this.itemRefs[nextIndex].current.focus();
			});
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			const nextIndex = index === items.length - 1 ? 0 : index + 1;

			this.setState({
				tabbableIndex: nextIndex,
				expandedIndex: undefined, //TODO WAI-ARIA implementation maintains this
			}, () => {
				this.itemRefs[nextIndex].current.focus();
			});
		}
		else if(key === 'Enter') {
			event.preventDefault();

			if(type === 'parentmenuitem') {
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

			if(type === 'parentmenuitem') {
				this.setState({
					expandedIndex: index,
				}, () => {
					this.itemRefs[index].current.focusFirstChild();
				});
			}
			else if(type === 'menuitemcheckbox') {
				//TODO change state without closing the menu
			}
			else if(type === 'menuitemradio') {
				//TODO change state without closing the menu
			}
			else if(type === 'menuitem') {
				//TODO activate the item and close the (whole?) menu
			}
		}
		else if(key === 'Home') {
			event.preventDefault();

			this.setState({
				tabbableIndex: 0,
				expandedIndex: undefined, //TODO: WAI-ARIA implementation maintains this
			}, () => {
				this.itemRefs[0].current.focus();
			});
		}
		else if(key === 'End') {
			event.preventDefault();

			this.setState({
				tabbableIndex: items.length - 1,
				expandedIndex: undefined, //TODO WAI-ARIA implementation maintains this
			}, () => {
				this.itemRefs[items.length - 1].current.focus();
			});
		}
		else if(key === 'Tab') {
			this.collapseMenu();
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
		const { items, orientation, label, labelId } = this.props;
		const itemNodes = items.map(this.renderItem);

		console.log(this.props, this.state);

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

	renderItem = (item, index) => {
		const { tabbableIndex, expandedIndex } = this.state
		const { type, node, children, isDisabled, orientation } = item;

		if(type === 'menuitem') {
			return (
				<MenuItem
					key={ index }
					index={ index }
					level={ 0 }
					onKeyDown={ this.onChildKeyDown }
					collapseParent={ this.collapseMenu }
					isDisabled={ isDisabled }
					isTabbable={ index === tabbableIndex }
					ref={ this.itemRefs[index] }
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
					level={ 0 }
					onKeyDown={ this.onChildKeyDown }
					collapseParent={ this.collapseMenu }
					focusPrevSibling={ this.focusPrevSibling }
					focusNextMenubarItem={ this.focusNextSibling }
					orientation={ orientation }
					isDisabled={ isDisabled }
					isExpanded={ index === expandedIndex }
					isTabbable={ index === tabbableIndex }
					ref={ this.itemRefs[index] }
				>
					{ node }
				</ParentMenuItem>
			);
		}
	};

	//---- Misc. ----
	initializeItems = (items, level = 0, position = []) => {
		const _items = [];

		items.forEach((item, i) => {
			const { type, children } = item;

			position = position.slice(0);
			position[level] = i;

			//We can't modify the props being passed in here,
			//so let's create a copy of items with some extra
			//info attached.
			_items.push(Object.assign({}, item, {
				position,
			}));

			if(type === 'parentmenuitem')
				_items[i].children = this.initializeItems(children, level + 1, position);
		});

		return _items;
	};

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
		const newIndex = index === 0 ? items.length - 1 : index - 1;

		this.setState({
			tabbableIndex: newIndex,
			expandedIndex: autoExpand ? newIndex : undefined,
		}, () => {
			this.itemRefs[newIndex].current.focus();
		});
	};
	
	//TODO not very flexible, assuming the current index is
	//what is currently expanded...
	focusNextSibling = () => {
		const { items } = this.props;
		const { expandedIndex } = this.state;
		const newIndex = expandedIndex === items.length - 1 ? 0 : expandedIndex + 1;

		console.log(expandedIndex, newIndex);

		this.setState({
			tabbableIndex: newIndex,
			expandedIndex: newIndex,
		}, () => {
			this.itemRefs[newIndex].current.focus();
		});
	};
}

export default MenuBar;
