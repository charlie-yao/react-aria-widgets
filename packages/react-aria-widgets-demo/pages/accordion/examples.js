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

export default function RenderFunctionAccordionOne() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="custom-rendering-section1">
				<AccordionHeader>
					RenderFunctionAccordionOne - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-rendering-section2">
				{ renderFunction }
			</AccordionSection>
			<AccordionSection id="custom-rendering-section3">
				<AccordionHeader>
					RenderFunctionAccordionOne - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}

const renderFunction = (args) => {
	const {
		id, index, headerLevel, getIsExpanded, getIsDisabled, setSectionRef, toggleSection,
		focusPrevSection, focusNextSection, focusFirstSection, focusLastSection,
	} = args;
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);
	const HeaderElement = \`h\${headerLevel}\`
	const contentId = \`\${id}-content\`;
	const style = {};

	const onClick = (event) => {
		toggleSection(event.target.id);	
	};

	const onKeyDown = (event) => {
		const { key } = event;

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

	if(!isExpanded)
		style.display = 'none';

	return (
		<> 
			<HeaderElement>
				<button
					type="button"
					id={ id }
					aria-controls={ contentId }
					aria-expanded={ isExpanded }
					aria-disabled={ isDisabled }
					onClick={ onClick }
					onKeyDown={ onKeyDown }
					ref={ setSectionRef }
				>
					RenderFunctionAccordionOne - Section 2
				</button>
			</HeaderElement>
			<section
				id={ contentId }
				aria-labelledby={ id }
				style={ style }
			>
				Hello world!
			</section>
		</>
	);
};`
