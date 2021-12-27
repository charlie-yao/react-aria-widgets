import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import MenuItem from 'src/Menu/MenuItem';

function ParentMenuItem(props) {
	const { node, menuItems, isExpanded, isDisabled, renderMenuItem } = props;
	const menuItemNodes = menuItems.map((mi, index, array) => {
		return renderMenuItem(mi, index, array, props);
	});

	return (
		<li role="none">
			<a
				href="#"
				role="menuitem"
				aria-haspopup="menu"
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				tabindex="0"
			>
				{ node }
			</a>
			<ul role="menu">
				{ menuItemNodes }
			</ul>
		</li>
	);
}

ParentMenuItem.propTypes = {
	node: PropTypes.node.isRequired,
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf(['menuitem', 'parentmenuitem', 'menuitemcheckbox', 'menuitemreadio', 'separator']),
		node: PropTypes.node.isRequired,
		menuItems: PropTypes.array, //only required for "parentmenuitem"
	})).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	renderMenuItem: PropTypes.func,
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	renderMenuItem: function renderMenuItem(menuItem, index, array, props) {
		const { type, node, menuItems } = menuItem;
		let Element;

		if(type === 'menuitem')
			Element = MenuItem;
		else
			Element = MenuItem;

		return (
			<Element>
				{ node }
			</Element>
		);
	},
};

export default ParentMenuItem;
