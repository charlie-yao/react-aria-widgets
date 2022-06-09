import {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
	BaseAccordionHeader,
	BaseAccordionPanel,
} from '@charlie-yao/react-aria-widgets/accordion';

/*
 * Section 1: Basic accordion with custom classes
 * Section 2: Custom <AccordionPanel> and <AccordionHeader> with default styling
 * Section 3: Custom components that wrap over <BaseAccordionPanel> and <BaseAccordionHeader>
 * Section 4: Using a render function
 * Section 5: Using a render function with custom event handlers
 */
export default function CustomAccordion(props) {
	return (
		<Accordion headerlevel={ 4 }>
			<AccordionSection id="custom-accordion-one-section1">
				<AccordionHeader headerProps={{ className: 'headerClass' }} buttonProps={{ className: 'buttonClass' }}>
					CustomAccordion - Section 1	
				</AccordionHeader>
				<AccordionPanel className="panelClass">
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-one-section2">
				<StyledAccordionHeader>
					CustomAccordion - Section 2
				</StyledAccordionHeader>
				<StyledAccordionPanel>
					Hello world!
				</StyledAccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-accordion-one-section3">
				<CustomAccordionHeader>
					Custom Accordion - Section 3
				</CustomAccordionHeader>
				<CustomAccordionPanel>
					Hello world!
				</CustomAccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}

function StyledAccordionHeader(props) {
	const { headerProps, buttonProps, ...rest } = props;
	
	//Since the point is to demonstrate an <AccordionHeader> with a default custom
	//CSS class, we can't just spread props onto <AccordionHeader> as we may
	//inadvertently overwrite headerProps or buttonProps
	const _headerProps = Object.assign({}, headerProps, {
		className: 'headerClass',
	});

	const _buttonProps = Object.assign({}, headerProps, {
		className: 'buttonClass',
	});

	return (
		<AccordionHeader
			headerProps={ _headerProps }
			buttonProps={ _buttonProps }
			{...rest}
		/>
	);
}

function StyledAccordionPanel(props) {
	return (
		<AccordionPanel
			className="panelClass"
			{...props}
		/>
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
		className,
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
	const _className = `buttonClass ${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}`;

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
}
