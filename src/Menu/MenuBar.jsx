import React from 'react';
import PropTypes from 'prop-types';

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
		const { nextElementSibling } = target;
		const role = target.getAttribute('role');
		const position = target.dataset.position.split(',');
		const isParentMenuitem = role === 'menuitem' && nextElementSibling && nextElementSibling.getAttribute('role') === 'menu';
		const level = position.length - 1;
		let index = Number.parseInt(position[position.length - 1], 10);
		let item = items[index];
		let subItems = items; //(sub-)menu that item belongs in

		if(level > 0) {
			for(let i = 1; i < positions.length; i++) {
				const pos = Number.parseInt(positions[i], 10);
				item = subItems[pos];

				//Don't do this on the last iteration so we know
				//the subset of items that item belongs in. Otherwise,
				//subItems would  be the children of item (assuming
				//item is a parent menuitem).
				if(i < position.length - 1)
					subItems = item.children;
			}
		}

		console.log(level, index, item, subItems);

		//According to the WAI-ARIA Authoring Practices 1.1,
		//the element with the role "menu" should be the
		//sibling element immediately following its parent
		//"menuitem".
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

			if(level === 0) {
				const nextIndex = index === 0 ? items.length - 1 : index - 1;

				this.setState(prevState => {
					prevState.items[index].isFocusable = false;
					prevState.items[nextIndex].isFocusable = true;
					prevState.items[nextIndex].ref.current.focus();
					return prevState;
				});
			}
			else {
			}
		}
		else if(key === 'ArrowRight' || key === 'Right') {
			event.preventDefault();

			if(level === 0) {
				const nextIndex = index === items.length - 1 ? 0 : index + 1;

				this.setState(prevState => {
					prevState.items[index].isFocusable = false;
					prevState.items[nextIndex].isFocusable = true;
					prevState.items[nextIndex].ref.current.focus();
					return prevState;
				});
			}
			else {
			}
		}
		else if(key === 'Enter') {
			event.preventDefault();
		}
		else if(key === ' ' || key === 'Spacebar') {
			event.preventDefault();
		}
		else if(key === 'Home') {
			event.preventDefault();

			if(level === 0) {
				const nextIndex = 0;

				this.setState(prevState => {
					prevState.items[index].isFocusable = false;
					prevState.items[nextIndex].isFocusable = true;
					prevState.items[nextIndex].ref.current.focus();
					return prevState;
				});
			}
			else {
			}
		}
		else if(key === 'End') {
			event.preventDefault();

			if(level === 0) {
				const nextIndex = items.length - 1;

				this.setState(prevState => {
					prevState.items[index].isFocusable = false;
					prevState.items[nextIndex].isFocusable = true;
					prevState.items[nextIndex].ref.current.focus();
					return prevState;
				});
			}
			else {
			}
		}
		else if(key === 'Escape' || key === 'Esc') {
			event.preventDefault();
		}
		else if(key === 'Tab') {
			if(shiftKey) {
			}
			else {
			}
		}
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
				ref: React.createRef(),
				isFocusable: i === 0 && level === 0,
				position,
			}));

			if(type === 'parentmenuitem')
				_items[i].children = this.initializeItems(children, level + 1, position);
		});

		return _items;
	};
}

export default MenuBar;
