/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

function BaseAccordionPanel(props) {
	const { children, id, labelId, ...rest } = props;

	return (
		<section id={ id } aria-labelledby={ labelId } { ...rest }>
			{ children }
		</section>
	);
}

BaseAccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string.isRequired,
};

export default BaseAccordionPanel;
