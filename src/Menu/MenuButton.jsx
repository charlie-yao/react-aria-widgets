import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';

//Misc.
import { MENUITEMS_PROPTYPE } from 'src/utils/propTypes';

class MenuButton extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		items: MENUITEMS_PROPTYPE.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal']),
		isExpanded: PropTypes.bool,
	};

	static defaultProps = {
		orientation: 'vertical',
		isExpanded: false,
	};

	//---- Rendering ----
	render() {
		const { children, orientation, isExpanded } = this.props;

		//TODO: point aria-controls to the menu (optional)
		//TODO: keyboard interaction
		return (
			<Fragment>
				<button
					type="button"
					aria-haspopup="menu"
					aria-expanded={ isExpanded }
				>
					{ children }
				</button>
				<Menu
					orientation={ orientation }
				>
					{ this.renderItems() }
				</Menu>
			</Fragment>
		);
	}

	renderItems = () => {
		return (
			<div>Hello world!</div>
		);
	};
}

export default MenuButton;
