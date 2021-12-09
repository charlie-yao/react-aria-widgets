import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import createAccordionHOC from 'src/Accordion/createAccordionHOC';

//Misc.
import { validateLevelProp } from 'src/Accordion/utils';

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
					panelId={ `${id}Panel` }
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
					headerId={ `${id}Header` }
					isExpanded={ isExpanded }
				>
					{ panel }
				</AccordionPanel>
			</Fragment>
		);
	});
}

Accordion.propTypes = {
	level: validateLevelProp.isRequired,
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
