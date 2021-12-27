import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

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
		menuItems: MENU_ITEMS_PROPTYPE.isRequired,
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
	}

	//---- Events ----

	//---- Rendering ----
	render() {
		const { orientation, menuItems, label, labelId, renderItem } = this.props;
		const renderedMenuItems = menuItems.map((menuItem, index, array) => {
			return renderItem(menuItem, index, array, this.props);
		});

		return (
			<ul
				role="menubar"
				aria-orientation={ orientation }
				aria-labelledby={ labelId }
				aria-label={ label }
			>
				{ renderedMenuItems }
			</ul>
		);
	}
}

export default MenuBar;
