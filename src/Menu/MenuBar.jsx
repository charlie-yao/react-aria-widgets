import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';
import ParentMenuItem from 'src/Menu/ParentMenuItem';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';

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
		renderItem: function renderItem(menuItem, index, array, menuBarProps) {
			const { renderMenuItem, renderParentMenuItem } = menuBarProps;
			const { type } = menuItem;
			let node;

			if(type === 'menuitem')
				node = renderMenuItem(menuItem, index, array, menuBarProps);
			else if(type === 'parentmenuitem')
				node = renderParentMenuItem(menuItem, index, array, menuBarProps);
			else
				node = renderMenuItem(menuItem, index, array, menuBarProps);

			return node;
		},
		renderMenuItem: function renderMenuItem(menuItem, index) {
			const { node, props = {} } = menuItem;
			const { isDisabled } = props;

			return (
				<MenuItem key={ index } isDisabled={ isDisabled }>
					{ node }
				</MenuItem>
			);
		},
		renderParentMenuItem: function renderParentMenuItem(menuItem, index) {
			const { node, menuItems, props = {} } = menuItem;
			const { isDisabled, isEnabled } = props;

			return (
				<ParentMenuItem
					key={ index }
					menuItems={ menuItems }
					isDisabled={ isDisabled }
					isEnabled={ isEnabled }
				>
					{ node }
				</ParentMenuItem>
			);
		},
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
