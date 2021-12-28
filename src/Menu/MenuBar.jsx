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
		menuItems: MENU_ITEMS_PROPTYPE.isRequired,
		label: PropTypes.string, //eslint-disable-line react/require-default-props
		labelId: PropTypes.string, //eslint-disable-line react/require-default-props
		renderItem: PropTypes.func,
		renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
		renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	};

	static defaultProps = {
		orientation: 'horizontal',
		renderItem: renderItem,
		renderMenuItem,
		renderParentMenuItem,
	};

	constructor(props) {
		super(props);

		const { menuItems } = props;

		this.menuItemRefs = this.createRefs(menuItems);
	}

	//---- Events ----

	//---- Rendering ----
	render() {
		const { orientation, menuItems, label, labelId, renderItem } = this.props;
		const renderedMenuItems = menuItems.map((menuItem, index, array) => {
			return renderItem(menuItem, index, array, this.props, this.menuItemRefs);
		});

		console.log(this.menuItemRefs);

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

	//---- Misc. ----
	createRefs = (menuItems) => {
		const refs = [];

		menuItems.forEach((item, i) => {
			const { type, menuItems: subMenuItems } = item;

			if(type === 'parentmenuitem') {
				refs[i] = {
					ref: React.createRef(),
					childRefs: this.createRefs(subMenuItems),
				};
			}
			else
				refs[i] = React.createRef();
		});

		return refs;
	};
}

export default MenuBar;
