import React from 'react';
import PropTypes from 'prop-types';

function AccordionPanel(props) {
	const { children, id, headerId, isExpanded, className } = props;

	return (
		<section
			id={ id }
			aria-labelledby={ headerId }
			className={ `${className} ${isExpanded ? '' : 'hidden'}` }
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
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	isExpanded: false,
	className: '',
};

export default AccordionPanel;
