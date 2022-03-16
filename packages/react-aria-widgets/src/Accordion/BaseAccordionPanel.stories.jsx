import React from 'react';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

export default {
	title: 'Accordion/BaseAccordionPanel',
	component: BaseAccordionPanel,
};

const Template = args => <BaseAccordionPanel {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: 'Hello world!',
	id: 'placeholder',
	labelId: 'labelPlaceholder',
};

export const WithSectionRole = Template.bind({});
WithSectionRole.args = {
	children: 'Hello world!',
	id: 'placeholder',
	labelId: 'labelPlaceholder',
	tagName: 'div',
	role: 'section'
};

export const WithoutSectionRole = Template.bind({});
WithoutSectionRole.args = {
	children: 'Hello world!',
	id: 'placeholder',
	tagName: 'div',
};
