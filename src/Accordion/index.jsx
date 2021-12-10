import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import createAccordionManager from 'src/Accordion/createAccordionManager';

//Misc.
import { validateHeaderLevelProp } from 'src/Accordion/utils';

class Accordion extends React.Component {
	static propTypes = {
		headerLevel: validateHeaderLevelProp.isRequired,
		sections: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			header: PropTypes.node.isRequired,
			panel: PropTypes.node.isRequired,
		})).isRequired,
		triggerRefs: PropTypes.arrayOf(PropTypes.shape({
			current: PropTypes.object,
		})),
		expandedSections: PropTypes.instanceOf(Set).isRequired,
		onTriggerKeyDown: PropTypes.func.isRequired,
		getAllowToggle: PropTypes.func.isRequired,
		toggleSection: PropTypes.func.isRequired,
	};

	//---- Events ----
	onTriggerClick = (event) => {
		const { sections, toggleSection } = this.props;
		const index = Number.parseInt(event.target.dataset.index, 10);
		toggleSection(sections[index].id);
	};
	
	//---- Rendering ----
	render() {
		const {
			sections, getAllowToggle, headerLevel, expandedSections,
			onTriggerKeyDown, triggerRefs,
		} = this.props;
		const allowToggle = getAllowToggle();

		return sections.map((section, i) => {
			const { id, header, panel } = section;
			const isExpanded = expandedSections.has(id);

			return (
				<Fragment key={ id }>
					<AccordionHeader
						id={ `${id}Header` }
						panelId={ `${id}Panel` }
						headerLevel={ headerLevel }
						index={ i }
						isExpanded={ isExpanded }
						isDisabled={ !allowToggle && isExpanded }
						_ref={ triggerRefs[i] }
						onClick={ this.onTriggerClick }
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
}

export default createAccordionManager(Accordion);
