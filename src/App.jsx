import React from 'react';

//Components and Styles
import DemoAccordion from 'src/DemoAccordion';
import MenuBarOne from 'src/MenuBarOne';
import MenuBarTwo from 'src/MenuBarTwo';
import MenuButtonOne from 'src/MenuButtonOne';
import MenuButtonTwo from 'src/MenuButtonTwo';

function App() {
	return (
		<main>
			<h1>Accordion</h1>
			<DemoAccordion />
			<h1>Menu, Menubar, Menu Button</h1>
			<MenuBarOne />
			<MenuBarTwo />
			<MenuButtonOne />
			<MenuButtonTwo />
		</main>
	);
}

export default App;
