import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

const AccordionHeader = React.forwardRef((props, ref) => {
	const {
		children, id, controlsId, onClick, onKeyDown, headerLevel, index,
		isExpanded, isDisabled, headerProps, buttonProps
	} = props;
	const _buttonProps = Object.assign({}, buttonProps, {
		'data-index': index,
	});

	return (
		<BaseAccordionHeader
			id={ id }
			controlsId={ controlsId }
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
	id: PropTypes.string.isRequired,
	controlsId: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	headerLevel: validateHeaderLevelProp.isRequired,
	index: PropTypes.number.isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

AccordionHeader.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	headerProps: {},
	buttonProps: {},
};

export default AccordionHeader;
