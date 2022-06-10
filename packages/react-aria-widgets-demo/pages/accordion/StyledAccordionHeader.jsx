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
