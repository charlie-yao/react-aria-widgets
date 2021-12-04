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
		const { allowMultiple } = this.props;
		const allowToggle = this.getAllowToggle();
		const panelId = event.target.getAttribute('aria-controls');
		const field = `${panelId}Expanded`;

		if(allowMultiple) {
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
	};

	onTriggerKeyDown = (event) => {
		const { key } = event;
		const index = Number.parseInt(event.target.dataset.index);

		switch(key) {
			case 'ArrowUp':
				if(index === 0)
					this.triggerRefs[this.triggerRefs.length - 1].current.focus();
				else
					this.triggerRefs[index - 1].current.focus();

				event.preventDefault();
				break;
			case 'ArrowDown':
				if(index === this.triggerRefs.length - 1)
					this.triggerRefs[0].current.focus();
				else
					this.triggerRefs[index + 1].current.focus();

				event.preventDefault();
				break;
			case 'Home':
				this.triggerRefs[0].current.focus();
				event.preventDefault();
				break;
			case 'End':
				this.triggerRefs[this.triggerRefs.length - 1].current.focus();
				event.preventDefault();
				break;
		}
	};

	onDummySubmit = (event) => {
		event.preventDefault();
	};

	//---- Rendering ----
	render() {
		const { section1PanelExpanded, section2PanelExpanded, section3PanelExpanded } = this.state;
		const allowToggle = this.getAllowToggle();

		return (
			<Fragment>
				<h2 id="section1Header">
					<button
						aria-controls="section1Panel"
						aria-expanded={ section1PanelExpanded }
						onClick={ this.onClickTrigger }
						onKeyDown={ this.onTriggerKeyDown }
						aria-disabled={ !allowToggle && section1PanelExpanded }
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
						<input type="number" min="0" max="100" required step="1" id="section1Input2" />
						<button type="submit">Submit</button>
					</form>
				</section>
				<h2 id="section2Header">
					<button
						aria-controls="section2Panel"
						aria-expanded={ section2PanelExpanded }
						onClick={ this.onClickTrigger }
						onKeyDown={ this.onTriggerKeyDown }
						aria-disabled={ !allowToggle && section2PanelExpanded }
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
						aria-disabled={ !allowToggle && section3PanelExpanded }
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

	//---- Misc. ----
	getAllowToggle = () => {
		//Even though this component accepts allowMultiple and allowToggle
		//as independent props, the case of allowMultiple && !allowToggle
		//doesn't make much sense because we'd end up in a situation where
		//multiple accordion sections are expanded with no way of closing them.
		const { allowToggle, allowMultiple } = this.props;
		return allowMultiple ? true : allowToggle;
	};
}

export default Accordion;
