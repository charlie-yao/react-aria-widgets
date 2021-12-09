import React from 'react';

//Components and Styles
import Accordion from 'src/Accordion';

function onDummySubmit(event) {
	event.preventDefault();
}

const DUMMY_ACCORDION_SECTIONS = [
	{
		id: 'section1',
		header: 'Section 1',
		panel: (
			<div>
			</div>
		),
	},
	{
		id: 'section2',
		header: 'Section 2',
		panel: 'Section 2 content',
	},
	{
		id: 'section3',
		header: 'Section 3',
		panel: 'Section 3 content',
	},
];

function App() {
	return (
		<main>
			<h1>Accordion</h1>
			<Accordion level={ 2 } sections={ DUMMY_ACCORDION_SECTIONS } />
		</main>
	);
}

export default App;
