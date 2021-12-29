import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';
import { renderItem, renderMenuItem, renderParentMenuItem } from 'src/Menu/utils';

/*
 * Some notes on props:
 *
 * - If the menubar has a visible label, a labelId prop that points towards
 * the labeling element should be provided. Otherwise, one should pass in
 * a label via the label prop. In other words, one XOR the other must be provided.
 */
class MenuBar extends React.Component {
	static propTypes = {
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		items: MENU_ITEMS_PROPTYPE.isRequired,
		label: PropTypes.string,
		labelId: PropTypes.string,
		renderItem: PropTypes.func,
		renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
		renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	};

	static defaultProps = {
		orientation: 'horizontal',
		label: undefined,
		labelId: undefined,
		renderItem,
		renderMenuItem,
		renderParentMenuItem,
	};

	constructor(props) {
		super(props);

		const { items } = props;
		
		//TODO: feels incredibly awkward, e.g.:
		//- refs in state?
		//- what if someone passes new props (e.g. change isDisabled for an item)?
		this.state = {
			items: this.initializeItems(items),
		};
	}

	//---- Events ----
	onItemKeyDown = (event) => {
		const { orientation } = this.props;
		const { items } = this.state;
		const { key, target, shiftKey } = event;
		const { id, nextElementSibling } = target;
		const index = Number.parseInt(target.dataset.index, 10);
		const item = items[index];
		const role = target.getAttribute('role');
		const isParentMenuitem = role === 'menuitem' && nextElementSibling && nextElementSibling.getAttribute('role') === 'menu';
		let nextIndex = index;

		//According to the WAI-ARIA Authoring Practices 1.1,
		//the element with the role "menu" should be the
		//sibling element immediately following its parent
		//"menuitem".
		console.log(key, shiftKey, id, index, item, isParentMenuitem);
		
		//TODO: Any key that corresponds to a printable character (Optional):
		//Move focus to the next menu item in the current menu whose label begins
		//with that printable character.
		//TODO: take into account orientation
		if(key === 'ArrowUp' || key === 'Up') {
			event.preventDefault();
		}
		else if(key === 'ArrowDown' || key === 'Down') {
			event.preventDefault();
		}
		else if(key === 'ArrowLeft' || key === 'Left') {
			event.preventDefault();
			nextIndex = index === 0 ? items.length - 1 : index - 1;
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();
			nextIndex = index === items.length - 1 ? 0 : index + 1;
		}
		else if(key === 'Enter') {
			event.preventDefault();
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();
		}
		else if(key === 'Home') {
			event.preventDefault();
			nextIndex = 0;
		}
		else if(key === 'End') {
			event.preventDefault();
			nextIndex = items.length - 1;
		}
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();
		}
		else if(key === 'Tab') {
			event.preventDefault();

			if(shiftKey) {
			}
			else {
			}
		}

		this.setState(prevState => {
			prevState.items[index].isFocusable = false;
			prevState.items[nextIndex].isFocusable = true;
			prevState.items[nextIndex].ref.current.focus();
			return prevState;
		});
	};

	//---- Rendering ----
	render() {
		const { orientation, label, labelId, renderItem } = this.props;
		const { items } = this.state;
		const itemNodes = items.map((item, index, _items) => {
			return renderItem(item, index, _items, this.props, this.onItemKeyDown);
		});

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

	//---- Misc. ----
	initializeItems = (items, parentId) => {
		const _items = [];

		items.forEach((item, i) => {
			const { type, children, id } = item;
			const _id = id ? id : uuidv4();
			
			//We can't modify the props being passed in here,
			//so let's create a copy of items with some extra
			//info attached.
			_items.push(Object.assign({}, item, {
				id: _id,
				ref: React.createRef(),
				isFocusable: i === 0 && !parentId,
				parentId,
			}));

			if(type === 'parentmenuitem')
				_items[i].children = this.initializeItems(children, _id);
		});

		return _items;
	};
}

export default MenuBar;
