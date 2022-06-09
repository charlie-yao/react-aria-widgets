import {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
	BaseAccordionHeader,
	BaseAccordionPanel,
} from '@charlie-yao/react-aria-widgets/accordion';

//Components
import StyledAccordionHeader from './StyledAccordionHeader';
import StyledAccordionPanel from './StyledAccordionPanel';

/*
 * Section 1: Basic accordion with custom classes
 * Section 2: Composing <AccordionPanel> and <AccordionHeader> to have default styling
 * Section 3: Composing <BaseAccordionPanel> and <BaseAccordionHeader>
 * Section 4: Using a render function
 */
export default function CustomAccordion(props) {
	return (
		<Accordion headerlevel={ 4 }>
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

function CustomAccordionHeader(props) {
	const {
		children,
		id,
		index,
		headerLevel,
		setSectionRef,
		onTriggerClick,
		onTriggerKeyDown,
		getIsExpanded,
		getIsDisabled,
		headerProps,
		buttonProps,
	} = props;
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);
	const panelId = `${id}-panel`;
	
	const _headerProps = Object.assign({}, headerProps, {
		className: 'headerClass',
	});

	const _buttonProps = Object.assign({}, buttonProps, {
		'data-index': index,
		className: 'buttonClass',
	});

	return (
		<BaseAccordionHeader
			id={ id }
			controlsId={ panelId }
			headerLevel={ headerLevel }
			onClick={ onTriggerClick }
			onKeyDown={ onTriggerKeyDown }
			isExpanded={ isExpanded }
			isDisabled={ isDisabled }
			headerProps={ _headerProps }
			buttonProps={ _buttonProps }
			ref={ setSectionRef }
		>
			{ children }
		</BaseAccordionHeader>
	);
}

function CustomAccordionPanel(props) {
	//Note that <BaseAccordionPanel> assumes that if it is given a prop that isn't already
	//defined, it's meant to be spread onto the underlying HTML as an attribute. That means
	//if we want to add custom HTML attributes, we can't just spread props onto <BaseAccordionPanel>
	//because it's already receiving a number of props from <AccordionSection>.
	const {
		children,
		id,
		getIsExpanded,
		className = '',
		//Pull out the props from <AccordionSection> that shouldn't get passed down
		index,
		headerLevel,
		onTriggerClick,
		onTriggerKeyDown,
		allowMultiple,
		allowToggle,
		getIsDisabled,
		toggleSection,
		setSectionRef,
		focusSection,
		focusPrevSection,
		focusNextSection,
		focusFirstSection,
		focusLastSection,
		...rest
	} = props;
	const panelId = `${id}-panel`;
	const isExpanded = getIsExpanded(id);
	const _className = `panelClass ${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}`;

	return (
		<BaseAccordionPanel
			id={ panelId }
			labelId={ id }
			className={ _className }
			{ ...rest }
		>
			{ children }
		</BaseAccordionPanel>
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
	const contentId = `${id}-content`;

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
				className={ `panelClass ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
			>
				Hello world!
			</section>
		</>
	);
}
