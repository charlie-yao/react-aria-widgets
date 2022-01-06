import React from 'react';
import PropTypes from 'prop-types';

function MenuItemRadioGroup(props) {
	const { children, label, labelId } = props;

	return (
		<li>
			<ul
				role="group"
				aria-label={ label }
				aria-labelledby={ labelId }
			>
				{ children }
			</ul>
		</li>
	);
}

RadioGroup.propTypes = {
	children: PropTypes.node.isRequired,
	label: PropTypes.string,
	labelId: PropTypes.string,
};

RadioGroup.defaultProps = {
	label: undefined,
	labelId: undefined,
};

export default RadioGroup;
