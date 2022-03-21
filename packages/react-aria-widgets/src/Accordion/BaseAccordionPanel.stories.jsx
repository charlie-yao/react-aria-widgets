import React from 'react';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

export default {
	title: 'Accordion/BaseAccordionPanel',
	component: BaseAccordionPanel,
	args: {
		children: 'Hello world!',
		id: 'placeholder',
		labelId: 'labelPlaceholder',
	},
};

const Template = args => <BaseAccordionPanel {...args} />;

export const Default = Template.bind({});

export const WithSectionRole = Template.bind({});
WithSectionRole.args = {
	tagName: 'div',
	role: 'section'
};

export const WithoutSectionRole = Template.bind({});
WithoutSectionRole.args = {
	tagName: 'div',
};
