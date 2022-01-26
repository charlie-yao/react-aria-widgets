import React from 'react';
import { v4 as uuid } from 'uuid'

//Components and Styles
import MenuBar from 'src/Menu/MenuBar';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

class MenuBarOne extends React.Component {
	static propTypes = {
		items: MENUITEMS_PROPTYPE.isRequired,
	};

	constructor(props) {
		super(props);
		
		const { items } = props;
		const itemStateMap = {};
		const _items = this.initializeItems(items, itemStateMap);

		this.state = {
			items: _items,
			itemStateMap,
		};
	}

	//---- Rendering ----
	render() {
		const { items, itemStateMap } = this.state;

		return (
			<MenuBar
				label="Placeholder"
				items={ items }
				itemStateMap={ itemStateMap }
				toggleChecked={ this.toggleChecked }
			/>
		);
	}

	//---- Misc. ----
	initializeItems = (items, itemStateMap) => {
		const _items = [];

		items.forEach((item, i) => {
			const { type, children } = item;
			const id = uuid();
			const _item = Object.assign({}, item, {
				id,
			});

			_items.push(_item);
			itemStateMap[id] = _item;

			if(type === 'menu')
				_items[i].children = this.initializeItems(children, itemStateMap);
			else if(type === 'radiogroup') {
				_items[i].children = children.map(option => {
					const optionId = uuid();
					const _option = Object.assign({}, option, {
						id: optionId,
					});

					itemStateMap[optionId] = _option;

					return _option;
				});
			}
		});

		return _items;
	};

	toggleChecked = (id) => {
		console.log(id);

		//FIXME: does not work for radios or "mixed" values
		this.setState(state => {
			const { itemStateMap } = state;

			itemStateMap[id].isChecked = !itemStateMap[id].isChecked;

			return {
				itemStateMap,
			};
		});
	};
}

export default MenuBarOne;
