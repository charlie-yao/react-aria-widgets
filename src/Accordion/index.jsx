import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import createAccordionHOC from 'src/Accordion/createAccordionHOC';

function Accordion(props) {
	const {
		sections, getAllowToggle, getIsExpandedKey, level,
		onTriggerClick, onTriggerKeyDown, triggerRefs,
	} = props;
	const allowToggle = getAllowToggle();

	return sections.map((section, i) => {
		const { id, header, panel } = section;
		const isExpanded = props[getIsExpandedKey(id)];

		return (
			<Fragment key={ id }>
				<AccordionHeader
					id={ `${id}Header` }
					controlsId={ `${id}Panel` }
					level={ level }
					index={ i }
					isExpanded={ isExpanded }
					isDisabled={ !allowToggle && isExpanded }
					_ref={ triggerRefs[i] }
					onClick={ onTriggerClick }
					onKeyDown={ onTriggerKeyDown }
				>
					{ header }
				</AccordionHeader>
				<AccordionPanel
					id={ `${id}Panel` }
					labelId={ `${id}Header` }
					isExpanded={ isExpanded }
				>
					{ panel }
				</AccordionPanel>
			</Fragment>
		);
	});
}

Accordion.propTypes = {
	level: function(props, propName) {
		const level = props[propName];

		if(!Number.isInteger(level) || level < 1 || level > 6)
			return new Error(`${propName} must be an integer between 1 and 6 (inclusive).`);
	},
	sections: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		header: PropTypes.node.isRequired,
		panel: PropTypes.node.isRequired,
	})).isRequired,
	triggerRefs: PropTypes.arrayOf(PropTypes.shape({
		current: PropTypes.object,
	})),
	onTriggerClick: PropTypes.func.isRequired,
	onTriggerKeyDown: PropTypes.func.isRequired,
	getAllowToggle: PropTypes.func.isRequired,
	getIsExpandedKey: PropTypes.func.isRequired,
};

/*
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
}
*/

export default createAccordionHOC(Accordion);
