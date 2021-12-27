import React from 'react';
import PropTypes from 'prop-types';

function ParentMenuItem(props) {
	const { node, menuItems, isExpanded, isDisabled } = props;

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
				<li role="menuitem" aria-disabled={ false } tabindex="-1">
					Hello world!
				</li>
				<li role="menuitem" aria-disabled={ false } tabindex="-1">
					Hello world!
				</li>
				<li role="menuitem" aria-disabled={ false } tabindex="-1">
					Hello world!
				</li>
			</ul>
		</li>
	);
}

ParentMenuItem.propTypes = {
	node: PropTypes.node.isRequired,
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf(['menuitem', 'parentmenuitem', 'menuitemcheckbox', 'menuitemreadio', 'separator']),
		node: PropTypes.node.isRequired,
		menuItems: PropTypes.array, //only relevant for "parentmenuitem"
	})).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
};

ParentMenuItem.defaultProps = {
	isExpanded: false,
	isDisabled: false,
};

export default ParentMenuItem;
