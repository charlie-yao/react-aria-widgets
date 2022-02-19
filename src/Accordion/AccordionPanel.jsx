import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//HOCs
import { createNoOpHOC } from 'src/utils';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionPanel(props) {
	const { children, id, className, isExpanded } = props;

	return (
		<BaseAccordionPanel
			id={ getPanelId(id) }
			labelId={ id }
			className={ `${className} ${isExpanded ? '' : 'hidden'}` }
		>
			{ children }
		</BaseAccordionPanel>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	className: '',
};

export default createNoOpHOC(AccordionPanel);
