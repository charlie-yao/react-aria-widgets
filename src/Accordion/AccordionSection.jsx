import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import { createNoOpHOC } from 'src/utils';

class AccordionSection extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		id: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
	};

	//---- Rendering ----
	render() {
		//const { children, id, index } = this.props;
		const { children, id, index, onTriggerClick, onTriggerKeyDown, headerLevel, getIsExpanded, getIsDisabled, setSectionRef } = this.props;
		const mappedChildren = React.Children.map(children, child => {
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

		return mappedChildren;
	}
}

export default createNoOpHOC(AccordionSection);
