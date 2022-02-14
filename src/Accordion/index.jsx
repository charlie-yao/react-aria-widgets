import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import createAccordionManager from 'src/Accordion/createAccordionManager';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

class Accordion extends React.Component {
	static propTypes = {
		headerLevel: validateHeaderLevelProp.isRequired,
		sections: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			header: PropTypes.node.isRequired,
			panel: PropTypes.node.isRequired,
		})).isRequired,
		//From <AccordionManager>
		expandedSections: PropTypes.instanceOf(Set).isRequired,
		allowToggle: PropTypes.bool.isRequired,
		toggleSection: PropTypes.func.isRequired,
		setSectionRef: PropTypes.func.isRequired,
		focusPrevSection: PropTypes.func.isRequired,
		focusNextSection: PropTypes.func.isRequired,
		focusFirstSection: PropTypes.func.isRequired,
		focusLastSection: PropTypes.func.isRequired,
	};

	//---- Events ----
	onTriggerClick = (event) => {
		const { sections, toggleSection } = this.props;
		const index = Number.parseInt(event.target.dataset.index, 10);
		toggleSection(sections[index].id);
	};

	onTriggerKeyDown = (event) => {
		const { focusPrevSection, focusNextSection, focusFirstSection, focusLastSection } = this.props;
		const { key } = event;
		const index = Number.parseInt(event.target.dataset.index, 10);

		if(key === 'ArrowUp') {
			event.preventDefault();
			focusPrevSection(index);
		}
		else if(key === 'ArrowDown') {
			event.preventDefault();
			focusNextSection(index);
		}
		else if(key === 'Home') {
			event.preventDefault();
			focusFirstSection();
		}
		else if(key === 'End') {
			event.preventDefault();
			focusLastSection();
		}
	};

	//---- Rendering ----
	render() {
		const { sections } = this.props;
		return sections.map(this.renderSection);
	}

	renderSection = (section, i) => {
		const { allowToggle, headerLevel, expandedSections, setSectionRef } = this.props;
		const { id, header, panel } = section;
		const isExpanded = expandedSections.has(id);

		return (
			<Fragment key={ id }>
				<AccordionHeader
					id={ id }
					controlsId={ `${id}Panel` }
					headerLevel={ headerLevel }
					index={ i }
					isExpanded={ isExpanded }
					isDisabled={ !allowToggle && isExpanded }
					ref={ setSectionRef }
					onClick={ this.onTriggerClick }
					onKeyDown={ this.onTriggerKeyDown }
				>
					{ header }
				</AccordionHeader>
				<AccordionPanel
					id={ `${id}Panel` }
					labelId={ id }
					isExpanded={ isExpanded }
				>
					{ panel }
				</AccordionPanel>
			</Fragment>
		);
	};
}

export default createAccordionManager(Accordion);
export { Accordion };
