export const basicAccordionExample =
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function BasicAccordion() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="basic-section1">
				<AccordionHeader>
					BasicAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="basic-section2">
				<AccordionHeader>
					BasicAccordion - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="basic-section3">
				<AccordionHeader>
					BasicAccordion - Section 3
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

export const CustomAccordionExample =
`
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
import customRenderFunction from './customRenderFunction';

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
				{ customRenderFunction }
			</AccordionSection>
		</Accordion>
	);
}
`;

export const StyledAccordionHeaderExample =
`
import React from 'react';
import PropTypes from 'prop-types';
import { AccordionHeader } from '@charlie-yao/react-aria-widgets/accordion';

function StyledAccordionHeader(props) {
	const { headerProps, buttonProps, ...rest } = props;
	
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

StyledAccordionHeader.propTypes = {
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

StyledAccordionHeader.defaultProps = {
	headerProps: {},
	buttonProps: {},
};

export default StyledAccordionHeader;
`;

export const StyledAccordionPanelExample =
`
import React from 'react';
import { AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function StyledAccordionPanel(props) {
	return (
		<AccordionPanel
			className="panelClass"
			{...props}
		/>
	);
}
`;

export const CustomAccordionHeaderExample =
`
import React from 'react';
import PropTypes from 'prop-types';
import { BaseAccordionHeader } from '@charlie-yao/react-aria-widgets/accordion';

function CustomAccordionHeader(props) {
	const {
		children,
		id,
		index,
		headerLevel,
		setSectionRef,
		onClick,
		onKeyDown,
		getIsExpanded,
		getIsDisabled,
		headerProps,
		buttonProps,
	} = props;
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);
	const panelId = \`\${id}-panel\`;
	
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
			onClick={ onClick }
			onKeyDown={ onKeyDown }
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

CustomAccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	headerLevel: PropTypes.number.isRequired,
	setSectionRef: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	getIsExpanded: PropTypes.func.isRequired,
	getIsDisabled: PropTypes.func.isRequired,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

CustomAccordionHeader.defaultProps = {
	headerProps: {},
	buttonProps: {},
};

export default CustomAccordionHeader;
`;

export const CustomAccordionPanelExample =
`
import React from 'react';
import PropTypes from 'prop-types';
import { BaseAccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

function CustomAccordionPanel(props) {
	const {
		children,
		id,
		getIsExpanded,
		className,
		//Pull out the props from <AccordionSection> that shouldn't get passed down
		index,
		headerLevel,
		onClick,
		onKeyDown,
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
	const panelId = \`\${id}-panel\`;
	const isExpanded = getIsExpanded(id);
	const _className = \`panelClass \${className} \${isExpanded ? '' : 'react-aria-widgets-hidden'}\`;

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

CustomAccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	getIsExpanded: PropTypes.func.isRequired,
	className: PropTypes.string,
};

CustomAccordionPanel.defaultProps = {
	className: '',
};

export default CustomAccordionPanel;
`;

export const customRenderFunctionExample =
`
import React from 'react';

export default function renderFunction(props) {
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
	const HeaderElement = \`h\${headerLevel}\`;
	const contentId = \`\${id}-panel\`;
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
`;
