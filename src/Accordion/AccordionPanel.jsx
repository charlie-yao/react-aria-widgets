import React from 'react';
import PropTypes from 'prop-types';

function AccordionPanel(props) {
	const { children, id, labelId, isExpanded } = props;

	return (
		<section id={ id } aria-labelledby={ labelId } hidden={ !isExpanded }>
			{ children }
		</section>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string.isRequired,
	isExpanded: PropTypes.bool,
};

AccordionPanel.defaultProps = {
	isExpanded: true,
};

export default AccordionPanel;
