import React from 'react';

//Components and Styles
import Accordion from 'src/Accordion/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//Stories
import { Default, RenderFunction } from 'src/Accordion/AccordionSection.stories';

export default {
	title: 'Accordion/Accordion',
	component: Accordion,
	subcomponents: {
		AccordionSection,
		AccordionHeader,
		AccordionPanel,
	},
	args: {
		headerLevel: 2,
		items: [
			{ ...Default.args, id: 'section1' },
			{ ...Default.args, id: 'section2' },
			{ ...RenderFunction.args, id: 'section3' },
			{ ...RenderFunction.args, id: 'section4' },
		],
	},
};

function Template(args) {
	const { items, ...rest } = args;

	return (
		<Accordion { ...rest }>
			{ items.map(item => <AccordionSection key={ item.id } { ...item } />) }
		</Accordion>
	);
}

export const MultipleToggle = Template.bind({});
MultipleToggle.args = {
	allowMultiple: true,
	allowToggle: true,
};

export const NoMultipleToggle = Template.bind({});
NoMultipleToggle.args = {
	allowMultiple: false,
	allowToggle: true,
};

export const MultipleNoToggle = Template.bind({});
MultipleNoToggle.args = {
	allowMultiple: true,
	allowToggle: false,
};

export const NoMultipleNoToggle = Template.bind({});
NoMultipleNoToggle.args = {
	allowMultiple: false,
	allowToggle: false,
};
