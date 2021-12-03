import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NUM_SECTIONS = 3;

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

		this.triggerRefs = [];

		for(let i=0; i<NUM_SECTIONS; i++)
			this.triggerRefs[i] = React.createRef();
	}

	//---- Events ----
	onClickTrigger = (event) => {
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

	onTriggerKeyDown = (event) => {
		const { key } = event;
		const index = Number.parseInt(event.target.dataset.index);

		switch(key) {
			case 'ArrowUp':
				console.log('arrow up', index, this.triggerRefs[index]);
				event.preventDefault();
				break;
			case 'ArrowDown':
				console.log('arrow down', index, this.triggerRefs[index]);
				event.preventDefault();
				break;
			case 'Home':
				console.log('home', index, this.triggerRefs[index]);
				event.preventDefault();
				break;
			case 'End':
				console.log('end', index, this.triggerRefs[index]);
				event.preventDefault();
				break;
		}
	}

	onDummySubmit = (event) => {
		event.preventDefault();
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
						onClick={ this.onClickTrigger }
						onKeyDown={ this.onTriggerKeyDown }
						aria-disabled={ !allowMultiple && !allowToggle && section1PanelExpanded }
						data-index="0"
						ref={ this.triggerRefs[0] }
					>
						Section 1
					</button>
				</h2>
				<section
					id="section1Panel"
					aria-labelledby="section1Header"
					hidden={ !section1PanelExpanded }
				>
					<form onSubmit={ this.onDummySubmit }>
						<label htmlFor="section1Input1">Dummy Input #1</label>
						<input type="text" id="section1Input1" required />
						<label htmlFor="section1Input2">Dummy Input #2</label>
						<input type="number" min="0" max="100" required step="1" id="section1Input2"/>
						<button type="submit">Submit</button>
					</form>
				</section>
				<h2 id="section2Header">
					<button
						aria-controls="section2Panel"
						aria-expanded={ section2PanelExpanded }
						onClick={ this.onClickTrigger }
						onKeyDown={ this.onTriggerKeyDown }
						aria-disabled={ !allowMultiple && !allowToggle && section2PanelExpanded }
						data-index="1"
						ref={ this.triggerRefs[1] }
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
						onClick={ this.onClickTrigger }
						onKeyDown={ this.onTriggerKeyDown }
						aria-disabled={ !allowMultiple && !allowToggle && section3PanelExpanded }
						data-index="2"
						ref={ this.triggerRefs[2] }
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
