import React, { Fragment } from 'react';

class Accordion extends React.Component {
	render() {
		return (
			<Fragment>
				<h2><button>Section 1</button></h2>
				<section>Section 1 content</section>
				<h2><button>Section 2</button></h2>
				<section>Section 2 content</section>
				<h2><button>Section 3</button></h2>
				<section>Section 3 content</section>
			</Fragment>
		);
	}
}

export default Accordion;
