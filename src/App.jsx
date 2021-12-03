import React, { Fragment } from 'react';

//Components and Styles
import Accordion from 'src/Accordion';

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<main>
					<h1>Accordion</h1>
					<Accordion />
				</main>
			</Fragment>
		);
	}
}

export default App;
