/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//HOCs
import withNoOp from 'src/hocs/withNoOp';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionPanel(props) {
	const {
		children, id, getIsExpanded, className,
		//Pull out props received from <AccordionSection> that shouldn't get passed down
		index, headerLevel, onTriggerClick, onTriggerKeyDown,
		allowMultiple, allowToggle, getIsDisabled,
		toggleSection, setSectionRef, focusSection,
		focusPrevSection, focusNextSection, focusFirstSection, focusLastSection,
		...rest
	} = props;
	const isExpanded = getIsExpanded(id);

	return (
		<BaseAccordionPanel
			id={ getPanelId(id) }
			labelId={ id }
			className={ `${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
			{ ...rest }
		>
			{ children }
		</BaseAccordionPanel>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	getIsExpanded: PropTypes.func.isRequired,
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	className: '',
};

export default withNoOp(AccordionPanel);
