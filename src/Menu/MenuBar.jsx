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

		this.itemRefs = this.createRefs(items);
	}

	//---- Events ----

	//---- Rendering ----
	render() {
		const { orientation, items, label, labelId, renderItem } = this.props;
		const itemNodes = items.map((item, index, _items) => {
			return renderItem(item, index, _items, this.props, this.itemRefs[index]);
		});

		console.log(this.props, this.itemRefs);

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
	createRefs = (items) => {
		const refs = [];

		items.forEach((item, i) => {
			const { type, items: subItems } = item;

			if(type === 'parentmenuitem') {
				refs[i] = {
					ref: React.createRef(),
					childRefs: this.createRefs(subItems),
				};
			}
			else
				refs[i] = React.createRef();
		});

		return refs;
	};
}

export default MenuBar;
