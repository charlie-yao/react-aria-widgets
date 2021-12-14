import React from 'react';

//Components and Styles
import Accordion from 'src/Accordion';
import MenuButton from 'src/Menu/MenuButton';
import MenuBar from 'src/Menu/MenuBar';

function onDummySubmit(event) {
	event.preventDefault();
}

const DUMMY_ACCORDION_SECTIONS = [
	{
		id: 'section1',
		header: 'Section 1',
		panel: (
			<form onSubmit={ onDummySubmit }>
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
			<Accordion headerLevel={ 2 } sections={ DUMMY_ACCORDION_SECTIONS } />
			<h1>Menu, Menubar, Menu Button</h1>
			<MenuButton>
				Menu Button
			</MenuButton>
			<MenuBar>
				<li>Hello</li>
				<li>World!</li>
			</MenuBar>
		</main>
	);
}

export default App;
