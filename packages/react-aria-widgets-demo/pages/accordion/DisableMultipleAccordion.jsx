import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function DisableMultipleAccordion() {
	return (
		<Accordion headerLevel={ 5 } allowMultiple={ false }>
			<AccordionSection id="disable-multiple-section1">
				<AccordionHeader>
					DisableMultipleAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-multiple-section2">
				<AccordionHeader>
					DisableMultipleAccordion - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-multiple-section3">
				<AccordionHeader>
					DisableMultipleAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}
