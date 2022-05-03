import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

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
}
