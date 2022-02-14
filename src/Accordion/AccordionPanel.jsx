import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

function AccordionPanel(props) {
	const { children, id, labelId, isExpanded, className } = props;

	return (
		<BaseAccordionPanel
			id={ id }
			labelId={ labelId }
			className={ `${className} ${isExpanded ? '' : 'hidden'}` }
		>
			{ children }
		</BaseAccordionPanel>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string.isRequired,
	isExpanded: PropTypes.bool,
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	isExpanded: false,
	className: '',
};

export default AccordionPanel;
