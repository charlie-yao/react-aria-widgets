import React from 'react';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';

export default {
	title: 'Accordion/AccordionHeader',
	component: AccordionHeader,
	args: {
		children: 'Hello world!',
		id: 'accordionId',
		index: 1,
		headerLevel: 2,
		onTriggerClick: () => {},
		onTriggerKeyDown: () => {},
		setSectionRef: () => {},
	},
};

const Template = args => <AccordionHeader {...args} />;

export const Expanded = Template.bind({});
Expanded.args = {
	isExpanded: true,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
	isExpanded: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
	isExpanded: true,
	isDisabled: true,
};
