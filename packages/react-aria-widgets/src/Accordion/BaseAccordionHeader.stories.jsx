import React from 'react';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

export default {
	title: 'Accordion/BaseAccordionHeader',
	component: BaseAccordionHeader,
	args: {
		children: 'Hello world!',	
		id: 'headerId',
		controlsId: 'panelId',
		headerLevel: 'h2',
		onClick: () => {},
	},
};

const Template = args => <BaseAccordionHeader {...args} />;

export const Expanded = Template.bind({});
Expanded.args = {
	isExpanded: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	isDisabled: true,
};
