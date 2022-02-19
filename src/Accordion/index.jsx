import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionSection from 'src/Accordion/AccordionSection';

//HOCs
import createAccordionManager from 'src/Accordion/createAccordionManager';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

export const AccordionContext = React.createContext();

class Accordion extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		headerLevel: validateHeaderLevelProp,
		//From <AccordionManager>
		toggleSection: PropTypes.func.isRequired,
		getIsExpanded: PropTypes.func.isRequired,
		getIsDisabled: PropTypes.func.isRequired,
		setSectionRef: PropTypes.func.isRequired,
		focusPrevSection: PropTypes.func.isRequired,
		focusNextSection: PropTypes.func.isRequired,
		focusFirstSection: PropTypes.func.isRequired,
		focusLastSection: PropTypes.func.isRequired,
	};

	static defaultProps = {
		headerLevel: 2,
	};

	//---- Events ----
	onTriggerClick = (event) => {
		const { toggleSection } = this.props;
		toggleSection(event.target.id);
	};

	onTriggerKeyDown = (event) => {
		const { focusPrevSection, focusNextSection, focusFirstSection, focusLastSection } = this.props;
		const { key } = event;
		const index = Number.parseInt(event.target.dataset.index, 10);

		if(key === 'ArrowUp') {
			event.preventDefault();
			focusPrevSection(index);
		}
		else if(key === 'ArrowDown') {
			event.preventDefault();
			focusNextSection(index);
		}
		else if(key === 'Home') {
			event.preventDefault();
			focusFirstSection();
		}
		else if(key === 'End') {
			event.preventDefault();
			focusLastSection();
		}
	};

	//---- Rendering ----
	render() {
		const { children, headerLevel, getIsExpanded, getIsDisabled, setSectionRef } = this.props;
		const mappedChildren = React.Children.map(children, (child, i) => {
			const { type } = child;

			if(type !== AccordionSection)
				throw new Error('Only <AccordionSection>s are valid children of <Accordion>.');
			
			return React.cloneElement(child, {
				index: i,
				onTriggerClick: this.onTriggerClick,
				onTriggerKeyDown: this.onTriggerKeyDown,
				headerLevel,
				getIsExpanded,
				getIsDisabled,
				setSectionRef,
			});
		});

		return mappedChildren;	
		/*
		return (
			<AccordionContext.Provider value={{
				onTriggerClick: this.onTriggerClick,
				onTriggerKeyDown: this.onTriggerKeyDown,
				headerLevel,
				getIsExpanded,
				getIsDisabled,
				setSectionRef,
			}}>
				{ mappedChildren }
			</AccordionContext.Provider>
		);
		*/
	}
}

export default createAccordionManager(Accordion);
