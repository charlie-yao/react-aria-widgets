import React, { Fragment } from 'react';

class Accordion extends React.Component {
	//---- Events ----

	//---- Rendering ----
	render() {
		return (
			<Fragment>
				<h2 id="section1Header">
					<button aria-controls="section1Content">
						Section 1
					</button>
				</h2>
				<section id="section1Content" aria-labelledby="section1Header">
					Section 1 content
				</section>
				<h2 id="section2Header">
					<button aria-controls="section2Content">
						Section 2
					</button>
				</h2>
				<section id="section2Content" aria-labelledby="section2Header">
					Section 2 content
				</section>
				<h2 id="section3Header">
					<button aria-controls="section3Content">
						Section 3
					</button>
				</h2>
				<section id="section3Content" aria-labelledby="section3Header">
					Section 3 content
				</section>
			</Fragment>
		);
	}
}

export default Accordion;
