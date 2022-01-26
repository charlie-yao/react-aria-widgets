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

		this.state = {
			items: this.initializeItems(),
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
	initializeItems = () => {
		const { items } = this.props;

		return items;
	};
}

export default MenuBarOne;
