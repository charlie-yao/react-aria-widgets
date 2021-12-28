import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

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

		this.itemMetaData = this.initializeMetaData(items);
	}

	//---- Events ----

	//---- Rendering ----
	render() {
		const { orientation, items, label, labelId, renderItem } = this.props;
		const itemNodes = items.map((item, index, _items) => {
			return renderItem(item, index, _items, this.props, this.itemMetaData[index]);
		});

		console.log(this.props, this.itemMetaData);

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
	initializeMetaData = (items, parentId) => {
		const metaData = [];

		items.forEach((item, i) => {
			const { type, items: subItems, props = {} } = item;
			const { id } = props;
			const _id = id ? id : uuidv4();

			metaData[i] = {
				id: _id,
				ref: React.createRef(),
				parentId,
			};

			if(type === 'parentmenuitem')
				metaData[i].childMetaData = this.initializeMetaData(subItems, _id);
		});

		return metaData;
	};
}

export default MenuBar;
