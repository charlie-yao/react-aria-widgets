import {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
} from '@charlie-yao/react-aria-widgets/accordion';

//Components
import StyledAccordionHeader from './StyledAccordionHeader';
import StyledAccordionPanel from './StyledAccordionPanel';
import CustomAccordionHeader from './CustomAccordionHeader';
import CustomAccordionPanel from './CustomAccordionPanel';

export default function CustomAccordion(props) {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="custom-accordion-section1">
				<AccordionHeader headerProps={{ className: 'headerClass' }} buttonProps={{ className: 'buttonClass' }}>
					CustomAccordion - Section 1	
				</AccordionHeader>
				<AccordionPanel className="panelClass">
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section2">
				<StyledAccordionHeader>
					CustomAccordion - Section 2
				</StyledAccordionHeader>
				<StyledAccordionPanel>
					Hello world!
				</StyledAccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section3">
				<CustomAccordionHeader>
					CustomAccordion - Section 3
				</CustomAccordionHeader>
				<CustomAccordionPanel>
					Hello world!
				</CustomAccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-section4">
				{ renderFunction }
			</AccordionSection>
		</Accordion>
	);
}

function renderFunction(props) {
	const {
		id,
		index,
		headerLevel,
		getIsExpanded,
		getIsDisabled,
		setSectionRef,
		toggleSection,
		focusPrevSection,
		focusNextSection,
		focusFirstSection,
		focusLastSection,
	} = props;
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);
	const HeaderElement = `h${headerLevel}`;
	const contentId = `${id}-panel`;
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
			<HeaderElement className="headerClass">
				<button
					type="button"
					className="buttonClass"
					id={ id }
					aria-controls={ contentId }
					aria-expanded={ isExpanded }
					aria-disabled={ isDisabled }
					onClick={ onClick }
					onKeyDown={ onKeyDown }
					ref={ setSectionRef }
				>
					CustomAccordion - Section 4
				</button>
			</HeaderElement>
			<section
				id={ contentId }
				aria-labelledby={ id }
				className="panelClass"
				style={ style }
			>
				Hello world!
			</section>
		</>
	);
}
