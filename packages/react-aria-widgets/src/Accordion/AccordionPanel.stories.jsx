import React from 'react';

//Components and Styles
import AccordionPanel from 'src/Accordion/AccordionPanel';

export default {
	title: 'Accordion/AccordionPanel',
	component: AccordionPanel,
	args: {
		children: 'Hello world!',
		id: 'accordionId',
	},
};

function Template(args) {
	return <AccordionPanel { ...args } />;
}

export const Expanded = Template.bind({});
Expanded.args = {
	isExpanded: true,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
	isExpanded: false,
};

export const WithClassName = Template.bind({});
WithClassName.args = {
	isExpanded: false,
	className: 'dummyClassName',
};
