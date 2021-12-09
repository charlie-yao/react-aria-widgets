import React from 'react';
import PropTypes from 'prop-types';

function AccordionPanel(props) {
	const { children, id, headerId, isExpanded } = props;

	return (
		<section
			id={ id }
			aria-labelledby={ headerId }
			hidden={ !isExpanded }
		>
			{ children }
		</section>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	headerId: PropTypes.string.isRequired,
	isExpanded: PropTypes.bool,
};

AccordionPanel.defaultProps = {
	isExpanded: false,
};

export default AccordionPanel;
