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
		menuLabel: PropTypes.string,
		menuId: PropTypes.string,
		id: PropTypes.string,
		isExpanded: PropTypes.bool,
	};

	static defaultProps = {
		orientation: 'vertical',
		isExpanded: false,
	};

	//---- Rendering ----
	render() {
		const { children, orientation, menuLabel, menuId, id, isExpanded } = this.props;

		return (
			<Fragment>
				<button
					type="button"
					aria-haspopup="menu"
					aria-controls={ menuId }
					id={ id }
					aria-expanded={ isExpanded }
				>
					{ children }
				</button>
				<Menu
					orientation={ orientation }
					label={ menuLabel }
					labelId={ id }
					id={ menuId }
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
