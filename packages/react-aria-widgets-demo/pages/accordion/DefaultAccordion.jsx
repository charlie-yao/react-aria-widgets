import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function DefaultAccordion() {
	return (
		<Accordion headerLevel={ 2 }>
			<AccordionSection id="default-section1">
				<AccordionHeader>
					Default Accordion Example - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="default-section2">
				<AccordionHeader>
					Default Accordion Example - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="default-section3">
				<AccordionHeader>
					Default Accordion Example - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}
