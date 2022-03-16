import React from 'react';

//Components and Styles
import BaseAccordionHeader from './BaseAccordionHeader';

export default {
	title: 'Accordion/BaseAccordionHeader',
	component: BaseAccordionHeader,
};

const Template = args => <BaseAccordionHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: 'headerId',
	controlsId: 'panelId',
	headerLevel: 'h2',
	onClick: () => {},
};
