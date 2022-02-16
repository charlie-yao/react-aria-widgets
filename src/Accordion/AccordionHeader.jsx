import React, { useContext } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';
import { AccordionContext } from 'src/Accordion';
import { AccordionSectionContext } from 'src/Accordion/AccordionSection';

const AccordionHeader = React.forwardRef((props, ref) => {
	const {
		children, onKeyDown, index,
		headerProps, buttonProps,
	} = props;
	const { headerLevel, toggleSection, allowToggle, expandedSections } = useContext(AccordionContext);
	const { id, panelId } = useContext(AccordionSectionContext);
	const isExpanded = expandedSections.has(id);
	const isDisabled = !allowToggle && isExpanded;

	const _buttonProps = Object.assign({}, buttonProps, {
		'data-index': index,
	});

	const onClick = (event) => {
		toggleSection(event.target.id);
	};

	return (
		<BaseAccordionHeader
			id={ id }
			controlsId={ panelId }
			onClick={ onClick }
			onKeyDown={ onKeyDown }
			headerLevel={ headerLevel }
			isExpanded={ isExpanded }
			isDisabled={ isDisabled }
			headerProps={ headerProps }
			buttonProps={ _buttonProps }
			ref={ ref }
		>
			{ children }
		</BaseAccordionHeader>
	);
});

AccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

AccordionHeader.defaultProps = {
	headerProps: {},
	buttonProps: {},
};

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
