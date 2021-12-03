import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Accordion extends React.Component {
	static propTypes = {
		allowMultiple: PropTypes.bool,
		allowToggle: PropTypes.bool,
	};

	static defaultProps = {
		allowMultiple: true,
		allowToggle: true,
	};
	
	constructor() {
		super();

		this.state = {
			section1PanelExpanded: true,
			section2PanelExpanded: false,
			section3PanelExpanded: false,
		};
	}

	//---- Events ----
	onClickAccordionTrigger = (event) => {
		const { allowMultiple, allowToggle } = this.props;
		const panelId = event.target.getAttribute('aria-controls');
		const field = `${panelId}Expanded`;
		
		if(allowMultiple) {
			//Just pretend allowToggle is true? The case of allowMultiple && !allowToggle
			//doesn't make much sense because it means we'd have a bunch of open sections
			//that can't be closed
			this.setState(prevState => {
				return {
					[field]: !prevState[field],
				};
			});
		}
		else {
			this.setState(prevState => {
				const state = {};

				Object.keys(prevState).forEach(key => {
					state[key] = key === field ? (allowToggle ? !prevState[field] : true) : false;
				});

				return state;
			});
		}
	}

	//---- Rendering ----
	render() {
		const { allowMultiple, allowToggle } = this.props;
		const { section1PanelExpanded, section2PanelExpanded, section3PanelExpanded } = this.state;

		return (
			<Fragment>
				<h2 id="section1Header">
					<button
						aria-controls="section1Panel"
						aria-expanded={ section1PanelExpanded }
						onClick={ this.onClickAccordionTrigger }
						aria-disabled={ !allowMultiple && !allowToggle && section1PanelExpanded }
					>
						Section 1
					</button>
				</h2>
				<section
					id="section1Panel"
					aria-labelledby="section1Header"
					hidden={ !section1PanelExpanded }
				>
					Section 1 content
				</section>
				<h2 id="section2Header">
					<button
						aria-controls="section2Panel"
						aria-expanded={ section2PanelExpanded }
						onClick={ this.onClickAccordionTrigger }
						aria-disabled={ !allowMultiple && !allowToggle && section2PanelExpanded }
					>
						Section 2
					</button>
				</h2>
				<section
					id="section2Panel"
					aria-labelledby="section2Header"
					hidden={ !section2PanelExpanded }
				>
					Section 2 content
				</section>
				<h2 id="section3Header">
					<button
						aria-controls="section3Panel"
						aria-expanded={ section3PanelExpanded }
						onClick={ this.onClickAccordionTrigger }
						aria-disabled={ !allowMultiple && !allowToggle && section3PanelExpanded }
					>
						Section 3
					</button>
				</h2>
				<section
					id="section3Panel"
					aria-labelledby="section3Header"
					hidden={ !section3PanelExpanded }
				>
					Section 3 content
				</section>
			</Fragment>
		);
	}
}

export default Accordion;
