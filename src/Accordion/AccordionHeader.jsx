import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//HOCs
import { createNoOpHOC } from 'src/utils';

//Misc.
import { getPanelId } from 'src/Accordion/utils';
import { validateHeaderLevelProp } from 'src/utils/propTypes';

function AccordionHeader(props) {
	const {
		children, id, index, headerLevel,
		setSectionRef, onTriggerClick, onTriggerKeyDown,
		isExpanded, isDisabled, headerProps, buttonProps
	} = props;

	const _buttonProps = Object.assign({}, buttonProps, {
		'data-index': index,
	});

	return (
		<BaseAccordionHeader
			id={ id }
			controlsId={ getPanelId(id) }
			headerLevel={ headerLevel }
			onClick={ onTriggerClick }
			onKeyDown={ onTriggerKeyDown }
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
	headerLevel: validateHeaderLevelProp.isRequired,
	setSectionRef: PropTypes.func.isRequired,
	onTriggerClick: PropTypes.func.isRequired,
	onTriggerKeyDown: PropTypes.func.isRequired,
	isExpanded: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

AccordionHeader.defaultProps = {
	headerProps: {},
	buttonProps: {},
};

export default createNoOpHOC(AccordionHeader);
