import React, { useContext } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';
import { AccordionContext } from 'src/Accordion';
import { AccordionSectionContext } from 'src/Accordion/AccordionSection';

function AccordionPanel(props) {
	const { children, className } = props;
	const { expandedSections } = useContext(AccordionContext);
	const { id, panelId } = useContext(AccordionSectionContext);
	const isExpanded = expandedSections.has(id);

	return (
		<BaseAccordionPanel
			id={ panelId }
			labelId={ id }
			className={ `${className} ${isExpanded ? '' : 'hidden'}` }
		>
			{ children }
		</BaseAccordionPanel>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	className: '',
};

export default AccordionPanel;
