/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//HOCs
import { createNoOpHOC } from 'src/utils';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionPanel(props) {
	const { children, id, isExpanded, className, ...rest } = props;

	return (
		<BaseAccordionPanel
			id={ getPanelId(id) }
			labelId={ id }
			className={ `${className} ${isExpanded ? '' : 'hidden'}` }
			{ ...rest }
		>
			{ children }
		</BaseAccordionPanel>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	isExpanded: PropTypes.bool.isRequired,
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	className: '',
};

export default createNoOpHOC(AccordionPanel);
