import React, { Fragment } from 'react';

//Components and Styles
import Accordion from 'src/Accordion';

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<h1>Accordion</h1>
				<Accordion allowToggle={ false }/>
			</Fragment>
		);
	}
}

export default App;
