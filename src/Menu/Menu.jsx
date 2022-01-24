import React from 'react';
import PropTypes from 'prop-types';

/*
 * Note:
 *
 * - The menu should either have a labelId prop that points to the menuitem or
 * button that controls its display XOR a label prop.
 */
class Menu extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string,
		labelId: PropTypes.string,
	};

	static defaultProps = {
		orientation: 'vertical',
		label: undefined,
		labelId: undefined,
	};

	//---- Rendering ----
	render() {
		const { children, orientation, label, labelId } = this.props;

		return (
			<ul
				role="menu"
				aria-orientation={ orientation }
				aria-label={ label }
				aria-labelledby={ labelId }
			>
				{ children }
			</ul>
		);
	}
}

export default Menu;
