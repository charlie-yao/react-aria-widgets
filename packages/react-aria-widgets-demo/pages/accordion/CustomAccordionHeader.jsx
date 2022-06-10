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

CustomAccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	headerLevel: PropTypes.number.isRequired,
	setSectionRef: PropTypes.func.isRequired,
	onTriggerClick: PropTypes.func.isRequired,
	onTriggerKeyDown: PropTypes.func.isRequired,
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
