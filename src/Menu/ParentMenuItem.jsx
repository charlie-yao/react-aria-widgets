import React from 'react';
import PropTypes from 'prop-types';

function ParentMenuItem(props) {
	return (
		<li role="none">
			<a
				href="#"
				role="menuitem"
				aria-haspopup="menu"
				aria-expanded={ false }
				aria-disabled={ false }
				tabindex="0"
			>
				Parent Menuitem 1
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
};

ParentMenuItem.defaultProps = {
};

export default ParentMenuItem;
