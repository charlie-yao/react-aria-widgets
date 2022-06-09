import React from 'react';
import { AccordionHeader } from '@charlie-yao/react-aria-widgets/accordion';

export default function StyledAccordionHeader(props) {
	const { headerProps, buttonProps, ...rest } = props;
	
	//Since the point is to demonstrate an <AccordionHeader> with a default custom
	//CSS class, we can't just spread props onto <AccordionHeader> as we may
	//inadvertently overwrite headerProps or buttonProps
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
