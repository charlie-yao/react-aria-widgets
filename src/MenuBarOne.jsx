import React from 'react';

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

		this.state = {
			items: this.initializeItems(items),
		};
	}

	//---- Rendering ----
	render() {
		const { items } = this.state;

		return (
			<MenuBar label="Placeholder" items={ items } />
		);
	}

	//---- Misc. ----
	initializeItems = (items) => {
		const _items = [];

		items.forEach((item, i) => {
			const { type, children } = item;

			//Create a copy of items because we shouldn't
			//be directly modifying any props
			_items.push(Object.assign({}, item));

			if(type === 'menu')
				_items[i].children = this.initializeItems(children);
		});

		return _items;
	};
}

export default MenuBarOne;
