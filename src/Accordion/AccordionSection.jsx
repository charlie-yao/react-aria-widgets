import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import { createNoOpHOC } from 'src/utils';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

class AccordionSection extends React.Component {
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.func,
		]).isRequired,
		id: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		onTriggerClick: PropTypes.func.isRequired,
		onTriggerKeyDown: PropTypes.func.isRequired,
		headerLevel: validateHeaderLevelProp,
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

	//---- Rendering ----
	render() {
		const { children, ...rest } = this.props;
		const {
			id, index, onTriggerClick, onTriggerKeyDown, headerLevel,
			getIsExpanded, getIsDisabled, setSectionRef
		} = rest;

		if(typeof children === 'function')
			return children(rest);
		else {
			return React.Children.map(children, child => {
				const { type } = child;

				if(type === AccordionHeader) {
					return React.cloneElement(child, {
						id,
						index,
						onTriggerClick,
						onTriggerKeyDown,
						headerLevel,
						getIsExpanded,
						getIsDisabled,
						setSectionRef,
					});
				}
				else if(type === AccordionPanel) {
					return React.cloneElement(child, {
						id,
						isExpanded: getIsExpanded(id),
					});
				}
				else
					throw new Error('Only <AccordionHeader> and <AccordionPanel> are valid children of <AccordionSection>.');
			});
		}
	}
}

export default createNoOpHOC(AccordionSection);
