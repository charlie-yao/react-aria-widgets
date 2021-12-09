import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

const NUM_SECTIONS = 3;

class Accordion extends React.Component {
	constructor() {
		super();

		this.state = {
			section1PanelExpanded: true,
			section2PanelExpanded: false,
			section3PanelExpanded: false,
		};

		this.triggerRefs = [];

		for(let i = 0; i < NUM_SECTIONS; i++)
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
		const index = Number.parseInt(event.target.dataset.index, 10);

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
				<AccordionHeader
					id="section1Header"
					controlsId="section1Panel"
					level={ 2 }
					isExpanded={ section1PanelExpanded }
					isDisabled={ !allowToggle && section1PanelExpanded }
					onClick={ this.onClickTrigger }
					onKeyDown={ this.onTriggerKeyDown }
					index={ 0 }
					_ref={ this.triggerRefs[0] }
				>
					Section 1
				</AccordionHeader>
				<AccordionPanel
					id="section1Panel"
					labelId="section1Header"
					isExpanded={ section1PanelExpanded }
				>
					<form onSubmit={ this.onDummySubmit }>
						<label htmlFor="section1Input1">Dummy Input #1</label>
						<input type="text" id="section1Input1" required />
						<label htmlFor="section1Input2">Dummy Input #2</label>
						<input type="number" min="0" max="100" required step="1" id="section1Input2" />
						<button type="submit">Submit</button>
					</form>
				</AccordionPanel>
				<AccordionHeader
					level={ 2 }
					id="section2Header"
					controlsId="section2Panel"
					index={ 1 }
					isExpanded={ section2PanelExpanded }
					isDisabled={ !allowToggle && section2PanelExpanded }
					_ref={ this.triggerRefs[1] }
					onClick={ this.onClickTrigger }
					onKeyDown={ this.onTriggerKeyDown }
				>
					Section 2
				</AccordionHeader>
				<AccordionPanel
					id="section2Panel"
					labelId="section2Header"
					isExpanded={ section2PanelExpanded }
				>
					Section 2 content
				</AccordionPanel>
				<AccordionHeader
					level={ 2 }
					index={ 2 }
					id="section3Header"
					controlsId="section3Panel"
					isExpanded={ section3PanelExpanded }
					isDisabled={ !allowToggle && section3PanelExpanded }
					_ref={ this.triggerRefs[2] }
					onClick={ this.onClickTrigger }
					onKeyDown={ this.onTriggerKeyDown }
				>
					Section 3
				</AccordionHeader>
				<AccordionPanel
					id="section3Panel"
					labelId="section3Header"
					isExpanded={ section3PanelExpanded }
				>
					Section 3 content
				</AccordionPanel>
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
