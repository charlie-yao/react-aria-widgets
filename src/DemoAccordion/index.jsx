import React from 'react';

//Components and Styles
import Accordion from 'src/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

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
				<AccordionHeader>
					Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
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
