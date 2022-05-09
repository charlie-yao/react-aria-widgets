import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function RenderFunctionAccordionTwo() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="render-function-two-section1">
				<AccordionHeader>
					RenderFunctionAccordionTwo - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="render-function-two-section2">
				{ renderFunction }
			</AccordionSection>
			<AccordionSection id="render-function-two-section3">
				<AccordionHeader>
					RenderFunctionAccordionTwo - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
};

const renderFunction = (args) => {
	const {
		id, index, headerLevel, getIsExpanded, getIsDisabled, setSectionRef,
		onTriggerClick, onTriggerKeyDown,
	} = args;
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);
	const HeaderElement = `h${headerLevel}`;
	const contentId = `${id}-content`;
	const style = {};

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
					onClick={ onTriggerClick }
					onKeyDown={ onTriggerKeyDown }
					ref={ setSectionRef }
				>
					RenderFunctionAccordionTwo - Section 2
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
};
