import React, { Fragment } from 'react';
import { Accordion as _Accordion } from '@charlie-yao/react-aria-widgets';

const {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
} = _Accordion;

function DemoAccordion() {
	return (
		<Accordion headerLevel={ 2 }>
			<AccordionSection id="section1">
				<AccordionHeader>
					Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="section2">
				{
					(args) => {
						const {
							id, index, headerLevel, getIsExpanded, getIsDisabled,
							setSectionRef, onTriggerClick, onTriggerKeyDown,
						} = args;
						const isExpanded = getIsExpanded(id);
						const isDisabled = getIsDisabled(id);

						return (
							<Fragment>
								<AccordionHeader
									id={ id }
									index={ index }
									headerLevel={ headerLevel }
									isExpanded={ isExpanded }
									isDisabled={ isDisabled }
									setSectionRef={ setSectionRef }
									onTriggerClick={ onTriggerClick }
									onTriggerKeyDown={ onTriggerKeyDown }
								>
									Section 2
								</AccordionHeader>
								<AccordionPanel id={ id } isExpanded={ isExpanded }>
									Hello world!
								</AccordionPanel>
							</Fragment>
						);
					}
				}
			</AccordionSection>
			<AccordionSection id="section3">
				<AccordionHeader>
					Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}

export default DemoAccordion;