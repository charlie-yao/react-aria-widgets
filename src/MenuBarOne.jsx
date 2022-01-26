import React from 'react';

//Components and Styles
import MenuBar from 'src/Menu/MenuBar';

//Misc.
import { MENUITEMS } from 'src/App';

class MenuBarOne extends React.Component {
	//---- Rendering ----
	render() {
		return (
			<MenuBar label="Placeholder" items={ MENUITEMS } />
		);
	}
}

export default MenuBarOne;
