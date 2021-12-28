import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import Menu from 'src/Menu/Menu';

//Misc.
import { MENU_ITEMS_PROPTYPE } from 'src/utils/propTypes';
import { renderItem, renderMenuItem, renderParentMenuItem } from 'src/Menu/utils';

const ParentMenuItem = React.forwardRef(function ParentMenuItem(props, ref) {
	const { children, items, refs, isExpanded, isDisabled, isFocusable, orientation, renderItem } = props;
	const itemNodes = items.map((item, index, _items) => {
		return renderItem(item, index, _items, props, refs[index]);
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
	refs: PropTypes.arrayOf(PropTypes.shape({
		current: PropTypes.object,
	})).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isFocusable: PropTypes.bool,
	orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
	renderItem: PropTypes.func,
	renderMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
	renderParentMenuItem: PropTypes.func, //eslint-disable-line react/no-unused-prop-types
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	isFocusable: false,
	orientation: 'horizontal',
	renderItem,
	renderMenuItem,
	renderParentMenuItem,
};

export default ParentMenuItem;
