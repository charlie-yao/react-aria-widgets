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

		this.itemMetaData = this.initializeMetaDataOld(items);

		this.state = {
			itemMap: this.initializeItemMap({}, items),
		};
	}

	//---- Events ----

	//---- Rendering ----
	render() {
		const { orientation, items, label, labelId, renderItem } = this.props;
		const itemNodes = items.map((item, index, _items) => {
			return renderItem(item, index, _items, this.props, this.itemMetaData[index]);
		});

		console.log(this.props, this.state, this.itemMetaData);

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
	/**
	 * Recursively traverses the item tree to create a "flattened"
	 * hashtable that maps each item's ID to any relevant data.
	 * The items prop represents the structure of the menu but
	 * this hashtable allows for quick lookups of data.
	 *
	 * @param {object} itemMap
	 * @param {Array} items An array of items representing a single (sub-)menu
	 * @param {string} [parentId] The ID of the (sub-)menu's parent menuitem
	 */
	initializeItemMap = (itemMap, items, parentId) => {
		items.forEach((item, index) => {
			const { type, items: childItems, id } = item;
			const _id = id ? id : uuidv4();

			//TODO: objects in itemMap cannot easily find their
			//position in items, and objects in items cannot easily
			//find their position in itemMap because we cannot modify
			//the items prop to give them their ID
			itemMap[_id] = {
				id: _id,
				ref: React.createRef(),
				parentId,
				index,
				items,
				childItems,
			};

			if(type === 'parentmenuitem')
				itemMap = this.initializeItemMap(itemMap, childItems, _id);
		});

		return itemMap;
	};

	initializeMetaDataOld = (items, parentId) => {
		const metaData = [];

		items.forEach((item, i) => {
			const { type, items: subItems, id } = item;
			const _id = id ? id : uuidv4();

			metaData[i] = {
				id: _id,
				ref: React.createRef(),
				parentId,
			};

			if(type === 'parentmenuitem')
				metaData[i].childMetaData = this.initializeMetaDataOld(subItems, _id);
		});

		return metaData;
	};
}

export default MenuBar;
