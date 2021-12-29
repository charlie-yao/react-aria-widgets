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
		label: PropTypes.string, //eslint-disable-line react/require-default-props
		labelId: PropTypes.string, //eslint-disable-line react/require-default-props
		renderItem: PropTypes.func,
		renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
		renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	};

	static defaultProps = {
		orientation: 'horizontal',
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
		console.log(event.target.id);
		console.log(event.target.getAttribute('role'));
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
				parentId,
			}));

			if(type === 'parentmenuitem')
				_items[i].children = this.initializeItems(children, _id);
		});

		return _items;
	};
}

export default MenuBar;
