import React from 'react';

//Components and Styles
import Accordion from 'src/Accordion';
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

class DemoAccordion extends React.Component {
	//---- Events ----
	onSubmit = (event) => {
		event.preventDefault();
	};

	//---- Rendering ----
	render() {
		return (
			<Accordion headerLevel={ 2 }>
				<AccordionSection id="section1">
					<AccordionHeader>
						Section 1
					</AccordionHeader>
					<AccordionPanel>
						Hello world!
					</AccordionPanel>
				</AccordionSection>
				<AccordionSection>
					<AccordionHeader>
						Section 2
					</AccordionHeader>
					<AccordionPanel>
						Hello world!
					</AccordionPanel>
				</AccordionSection>
				<AccordionSection>
					<AccordionHeader>
						Section 3
					</AccordionHeader>
					<AccordionPanel>
						Hello world!
					</AccordionPanel>
				</AccordionSection>
			</Accordion>
		);
	}

	//---- Misc. ----
	getSections = () => {
		return [
			{
				id: 'section1',
				header: 'Section 1',
				panel: (
					<form onSubmit={ this.onSubmit }>
						<label htmlFor="section1Input1">Dummy Input #1</label>
						<input type="text" id="section1Input1" required />
						<label htmlFor="section1Input2">Dummy Input #2</label>
						<input type="number" min="0" max="100" required step="1" id="section1Input2" />
						<button type="submit">Submit</button>
					</form>
				),
			},
			{
				id: 'section2',
				header: <span>Section 2</span>,
				panel: 'Section 2 content',
			},
			{
				id: 'section3',
				header: 'Section 3',
				panel: 'Section 3 content',
			},
		];
	};
}

export default DemoAccordion;
