import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';

//Misc.
import { MENU_ITEMS_PROPTYPE, MENU_ITEMS_METADATA_PROPTYPE } from 'src/utils/propTypes';
import { renderItem, renderMenuItem, renderParentMenuItem } from 'src/Menu/utils';

//TODO: this is straying further and further away
//from the idea of a "base" component - might be a good
//idea to separate the opinionated stuff I'm adding on?
const ParentMenuItem = React.forwardRef(function ParentMenuItem(props, ref) {
	const {
		children, items, isExpanded, isDisabled, isFocusable,
		orientation, renderItem, id, onKeyDown,
	} = props;
	const itemNodes = items.map((item, index, _items) => {
		return renderItem(item, index, _items, props, onKeyDown);
	});

	return (
		<li role="none">
			<a
				href="#"
				role="menuitem"
				aria-haspopup="menu"
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				tabIndex={ isFocusable ? '0' : '-1' }
				ref={ ref }
				id={ id }
				onKeyDown={ onKeyDown }
			>
				{ children }
			</a>
			<Menu orientation={ orientation }>
				{ itemNodes }
			</Menu>
		</li>
	);
});

ParentMenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	items: MENU_ITEMS_PROPTYPE.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isFocusable: PropTypes.bool,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
	id: PropTypes.string,
	renderItem: PropTypes.func,
	renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	isFocusable: false,
	orientation: 'horizontal',
	id: undefined,
	renderItem,
	renderMenuItem,
	renderParentMenuItem,
};

export default ParentMenuItem;
