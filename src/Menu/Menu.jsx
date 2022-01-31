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
		id: PropTypes.string,
		className: PropTypes.string,
	};

	static defaultProps = {
		orientation: 'vertical',
		label: undefined,
		labelId: undefined,
		id: undefined,
		className: undefined,
	};

	//---- Rendering ----
	render() {
		const { children, orientation, label, labelId, id, className } = this.props;

		return (
			<ul
				role="menu"
				aria-orientation={ orientation }
				aria-label={ label }
				aria-labelledby={ labelId }
				id={ id }
				className={ className }
			>
				{ children }
			</ul>
		);
	}
}

export default Menu;
