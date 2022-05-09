import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function RenderFunctionAccordionOne() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="render-function-one-section1">
				<AccordionHeader>
					RenderFunctionAccordionOne - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="render-function-one-section2">
				{ renderFunction }
			</AccordionSection>
			<AccordionSection id="render-function-one-section3">
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
	const HeaderElement = `h${headerLevel}`;
	const contentId = `${id}-content`;
	const style = {};

	const onClick = () => {
		toggleSection(id);	
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
};
