import React from 'react';
import PropTypes from 'prop-types';

class MenuButton extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		isExpanded: PropTypes.bool,
	};

	static defaultProps = {
		isExpanded: false,
	};

	//---- Rendering ----
	render() {
		const { children, isExpanded } = this.props;

		//TODO: point aria-controls to the menu (optional)
		//TODO: keyboard interaction
		return (
			<button
				type="button"
				aria-haspopup="menu"
				aria-expanded={ isExpanded }
			>
				{ children }
			</button>
		);
	}
}

export default MenuButton;
