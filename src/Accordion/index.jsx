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

export default createAccordionHOC(Accordion);
