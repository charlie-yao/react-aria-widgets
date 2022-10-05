/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { AccordionHeader } from 'react-aria-widgets/accordion';

function StyledAccordionHeader(props) {
	const { headerProps, buttonProps, ...rest } = props;
	const { className: suppliedHeaderClass } = headerProps;
	const { className: suppliedButtonClass } = buttonProps;

	const _headerProps = Object.assign({}, headerProps, {
		className: `defaultHeaderClass ${suppliedHeaderClass ? suppliedHeaderClass : ''}`,
	});

	const _buttonProps = Object.assign({}, headerProps, {
		className: `defaultButtonClass ${suppliedButtonClass ? suppliedButtonClass : ''}`,
	});

	return (
		<AccordionHeader
			headerProps={ _headerProps }
			buttonProps={ _buttonProps }
			{ ...rest }
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
