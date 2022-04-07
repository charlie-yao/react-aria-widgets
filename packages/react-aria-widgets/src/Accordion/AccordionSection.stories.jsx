import React, { Fragment } from 'react';

//Components and Styles
import Accordion from 'src/Accordion/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

export default {
	title: 'Accordion/AccordionSection',
	component: AccordionSection,
	args: {
		id: 'accordionId',
	},
	decorators: [
		(story) => (
			<Accordion headerLevel={ 2 }>
				{ story() }
			</Accordion>
		),
	],
};

function Template(args) {
	return <AccordionSection { ...args } />;
}

export const Default = Template.bind({});
Default.args = {
	children: [
		(
			<AccordionHeader key={ 0 }>
				Header
			</AccordionHeader>
		),
		(
			<AccordionPanel key={ 1 }>
				Hello world!
			</AccordionPanel>
		),
	],
};

export const RenderFunction = Template.bind({});
RenderFunction.args = {
	children: (args) => {
		const {
			id, index, headerLevel, getIsExpanded, getIsDisabled,
			setSectionRef, onTriggerClick, onTriggerKeyDown,
		} = args;
		const isExpanded = getIsExpanded(id);
		const isDisabled = getIsDisabled(id);

		return (
			<Fragment>
				<AccordionHeader
					id={ id }
					index={ index }
					headerLevel={ headerLevel }
					isExpanded={ isExpanded }
					isDisabled={ isDisabled }
					setSectionRef={ setSectionRef }
					onTriggerClick={ onTriggerClick }
					onTriggerKeyDown={ onTriggerKeyDown }
				>
					Header
				</AccordionHeader>
				<AccordionPanel id={ id } isExpanded={ isExpanded }>
					Hello world!
				</AccordionPanel>
			</Fragment>
		);
	},
};
