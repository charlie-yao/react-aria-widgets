export const defaultAccordionExample =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function DefaultAccordion() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="default-section1">
				<AccordionHeader>
					DefaultAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="default-section2">
				<AccordionHeader>
					DefaultAccordion - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="default-section3">
				<AccordionHeader>
					DefaultAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`;

export const disableMultipleExample =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

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
}`;

export const disableToggleExample =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

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
}`;

export const renderFunctionExampleOne =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function CustomRenderingAccordion() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="custom-rendering-section1">
				<AccordionHeader>
					CustomRenderingAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-rendering-section2">
				{
					(args) => {
						const {
							id, index, headerLevel, getIsExpanded, getIsDisabled,
							setSectionRef, onTriggerClick, onTriggerKeyDown,
						} = args;
						const isExpanded = getIsExpanded(id);
						const isDisabled = getIsDisabled(id);

						return (
							<>
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
									CustomRenderingAccordion - Section 2
								</AccordionHeader>
								<AccordionPanel id={ id } isExpanded={ isExpanded }>
									Hello world!
								</AccordionPanel>
							</>
						);
					}
				}
			</AccordionSection>
			<AccordionSection id="custom-rendering-section3">
				<AccordionHeader>
					CustomRenderingAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`;
