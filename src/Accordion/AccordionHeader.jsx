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
	//const { children, id, index, headerProps, buttonProps } = props;
	const { children, id, index, headerProps, buttonProps, headerLevel, getIsExpanded, getIsDisabled, setSectionRef, onTriggerClick, onTriggerKeyDown } = props;
	//const { headerLevel, getIsExpanded, getIsDisabled, setSectionRef, onTriggerClick, onTriggerKeyDown } = useContext(AccordionContext);
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);

	const _buttonProps = Object.assign({}, buttonProps, {
		'data-index': index,
	});

	return (
		<BaseAccordionHeader
			id={ id }
			controlsId={ getPanelId(id) }
			onClick={ onTriggerClick }
			onKeyDown={ onTriggerKeyDown }
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
	index: PropTypes.number.isRequired,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

AccordionHeader.defaultProps = {
	headerProps: {},
	buttonProps: {},
};

export default createNoOpHOC(AccordionHeader);
