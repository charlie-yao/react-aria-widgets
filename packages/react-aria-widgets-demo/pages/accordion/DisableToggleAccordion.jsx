import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function DisableToggleAccordion() {
	return (
		<Accordion headerLevel={ 5 } allowMultiple={ false } allowToggle={ false }>
			<AccordionSection id="disable-toggle-section1">
				<AccordionHeader>
					DisableToggleAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-toggle-section2">
				<AccordionHeader>
					DisableToggleAccordion - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-toggle-section3">
				<AccordionHeader>
					DisableToggleAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}
