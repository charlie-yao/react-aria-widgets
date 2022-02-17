import React, { useContext } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';
import { AccordionContext } from 'src/Accordion';

//HOCs
import { createNoOpHOC } from 'src/utils';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionHeader(props) {
	const {
		children, id, onKeyDown, index,
		headerProps, buttonProps,
	} = props;
	const { headerLevel, toggleSection, allowToggle, expandedSections, setSectionRef } = useContext(AccordionContext);
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
			controlsId={ getPanelId(id) }
			onClick={ onClick }
			onKeyDown={ onKeyDown }
			headerLevel={ headerLevel }
			isExpanded={ isExpanded }
			isDisabled={ isDisabled }
			headerProps={ headerProps }
			buttonProps={ _buttonProps }
			ref={ setSectionRef }
		>
			{ children }
		</BaseAccordionHeader>
	);
}

AccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

AccordionHeader.defaultProps = {
	headerProps: {},
	buttonProps: {},
};

export default createNoOpHOC(AccordionHeader);
