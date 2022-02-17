import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionSection from 'src/Accordion/AccordionSection';
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import createAccordionManager from 'src/Accordion/createAccordionManager';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

export const AccordionContext = React.createContext();

class Accordion extends React.Component {
	static propTypes = {
		sections: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			header: PropTypes.node.isRequired,
			panel: PropTypes.node.isRequired,
		})).isRequired,
		headerLevel: validateHeaderLevelProp,
		//From <AccordionManager>
		toggleSection: PropTypes.func.isRequired,
		allowToggle: PropTypes.bool.isRequired,
		expandedSections: PropTypes.instanceOf(Set).isRequired,
		setSectionRef: PropTypes.func.isRequired,
		focusPrevSection: PropTypes.func.isRequired,
		focusNextSection: PropTypes.func.isRequired,
		focusFirstSection: PropTypes.func.isRequired,
		focusLastSection: PropTypes.func.isRequired,
	};

	static defaultProps = {
		headerLevel: 2,
	};

	//---- Events ----
	onTriggerClick = (event) => {
		const { toggleSection } = this.props;
		toggleSection(event.target.id);
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
		//const { sections } = this.props;
		//return sections.map(this.renderSection);

		const { children, headerLevel, allowToggle, expandedSections, setSectionRef } = this.props;
		const sections = React.Children.map(children, (child, i) => {
			const { type, props } = child;

			if(type !== AccordionSection)
				throw new Error('Only <AccordionSection>s are valid children of <Accordion>.');

			return React.cloneElement(child, {
				index: i,
				onTriggerClick: this.onTriggerClick,
				onTriggerKeyDown: this.onTriggerKeyDown,
			});
		});

		return (
			<AccordionContext.Provider value={{
				headerLevel,
				allowToggle,
				expandedSections,
				setSectionRef,
			}}>
				{ sections }
			</AccordionContext.Provider>
		);
	}

	renderSection = (section, i) => {
		const { headerLevel, allowToggle, expandedSections, setSectionRef } = this.props;
		const { id, header, panel } = section;
		const isExpanded = expandedSections.has(id);

		return (
			<Fragment key={ id }>
				<AccordionHeader
					id={ id }
					controlsId={ this.getPanelId(id) }
					onClick={ this.onTriggerClick }
					onKeyDown={ this.onTriggerKeyDown }
					headerLevel={ headerLevel }
					index={ i }
					isExpanded={ isExpanded }
					isDisabled={ !allowToggle && isExpanded }
					ref={ setSectionRef }
				>
					{ header }
				</AccordionHeader>
				<AccordionPanel
					id={ this.getPanelId(id) }
					labelId={ id }
					isExpanded={ isExpanded }
				>
					{ panel }
				</AccordionPanel>
			</Fragment>
		);
	};

	//---- Misc. ----
	getPanelId = (id) => {
		return `${id}-panel`;
	};
}

export default createAccordionManager(Accordion);
export { Accordion };
