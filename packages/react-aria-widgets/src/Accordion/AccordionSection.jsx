import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import withNoOp from 'src/hocs/withNoOp';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

function AccordionSection(props) {
	const { children, ...rest } = props;

	return React.Children.map(children, child => {
		return React.cloneElement(child, rest);
	});
}

AccordionSection.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	headerLevel: validateHeaderLevelProp.isRequired,
	onTriggerClick: PropTypes.func.isRequired,
	onTriggerKeyDown: PropTypes.func.isRequired,
	allowMultiple: PropTypes.bool.isRequired,
	allowToggle: PropTypes.bool.isRequired,
	getIsExpanded: PropTypes.func.isRequired,
	getIsDisabled: PropTypes.func.isRequired,
	toggleSection: PropTypes.func.isRequired,
	setSectionRef: PropTypes.func.isRequired,
	focusSection: PropTypes.func.isRequired,
	focusPrevSection: PropTypes.func.isRequired,
	focusNextSection: PropTypes.func.isRequired,
	focusFirstSection: PropTypes.func.isRequired,
	focusLastSection: PropTypes.func.isRequired,
};

export default withNoOp(AccordionSection);
