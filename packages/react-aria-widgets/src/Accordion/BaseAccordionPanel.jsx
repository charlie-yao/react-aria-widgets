/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

function BaseAccordionPanel(props) {
	const { children, id, labelId, tagName: Component, ...rest } = props;

	return (
		<Component id={ id } aria-labelledby={ labelId } { ...rest }>
			{ children }
		</Component>
	);
}

BaseAccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string,
	tagName: PropTypes.string,
};

BaseAccordionPanel.defaultProps = {
	labelId: undefined,
	tagName: 'section',
};

export default BaseAccordionPanel;
