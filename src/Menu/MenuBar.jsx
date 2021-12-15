import React from 'react';
import PropTypes from 'prop-types';

/*
 * Some notes on props:
 *
 * - If the menubar has a visible label, a labelId prop that points towards
 * the labeling element should be provided. Otherwise, one should pass in
 * a label via the label prop. In other words, one XOR the other must be provided.
 */
class MenuBar extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		orientation: PropTypes.oneOf([ 'vertical', 'horizontal' ]),
		label: PropTypes.string, //eslint-disable-line react/require-default-props
		labelId: PropTypes.string, //eslint-disable-line react/require-default-props
	};

	static defaultProps = {
		orientation: 'horizontal',
	};

	//---- Rendering ----
	render() {
		const { children, orientation, label, labelId } = this.props;

		return (
			<ul
				role="menubar"
				aria-orientation={ orientation }
				aria-labelledby={ labelId }
				aria-label={ label }
			>
				{ children }
			</ul>
		);
	}
}

export default MenuBar;
