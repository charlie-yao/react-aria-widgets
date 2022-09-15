import React from 'react';
import PropTypes from 'prop-types';
import { BaseAccordionHeader } from '@charlie-yao/react-aria-widgets/accordion';

function CustomAccordionHeader(props) {
	const {
		children,
		id,
		index,
		headerLevel,
		setHeaderRef,
		onClick,
		onKeyDown,
		getIsExpanded,
		getIsDisabled,
		headerProps,
		buttonProps,
	} = props;
	const { className: suppliedHeaderClass } = headerProps;
	const { className: suppliedButtonClass } = buttonProps;
	const isExpanded = getIsExpanded(id);
	const isDisabled = getIsDisabled(id);
	const panelId = `${id}-panel`;

	const _headerProps = Object.assign({}, headerProps, {
		className: `defaultHeaderClass ${suppliedHeaderClass ? suppliedHeaderClass : ''}`,
	});

	const _buttonProps = Object.assign({}, buttonProps, {
		'data-index': index,
		className: `defaultButtonClass ${suppliedButtonClass ? suppliedButtonClass : ''}`,
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
			ref={ setHeaderRef }
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
	setHeaderRef: PropTypes.func.isRequired,
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
