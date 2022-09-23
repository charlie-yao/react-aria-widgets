/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function StyledAccordionPanel(props) {
	return (
		<AccordionPanel
			className="defaultPanelClass"
			{ ...props }
		/>
	);
}