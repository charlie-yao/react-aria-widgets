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
		//From <AccordionManager> or another state manager
		expandedSections: PropTypes.instanceOf(Set).isRequired,
		allowToggle: PropTypes.bool.isRequired,
		toggleSection: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		const { sections } = props;

		this.triggerRefs = [];

		sections.forEach((section, i) => {
			this.triggerRefs[i] = React.createRef();
		});
	}

	//---- Events ----
	onTriggerClick = (event) => {
		const { sections, toggleSection } = this.props;
		const index = Number.parseInt(event.target.dataset.index, 10);
		toggleSection(sections[index].id);
	};

	onTriggerKeyDown = (event) => {
		const { sections } = this.props;
		const { key } = event;
		const index = Number.parseInt(event.target.dataset.index, 10);

		switch(key) {
			case 'ArrowUp':
				event.preventDefault();

				if(index === 0)
					this.triggerRefs[sections.length - 1].current.focus();
				else
					this.triggerRefs[index - 1].current.focus();

				break;
			case 'ArrowDown':
				event.preventDefault();

				if(index === sections.length - 1)
					this.triggerRefs[0].current.focus();
				else
					this.triggerRefs[index + 1].current.focus();

				break;
			case 'Home':
				event.preventDefault();
				this.triggerRefs[0].current.focus();
				break;
			case 'End':
				event.preventDefault();
				this.triggerRefs[sections.length - 1].current.focus();
				break;
		}
	};

	//---- Rendering ----
	render() {
		const { sections } = this.props;
		return sections.map(this.renderSection);
	}

	renderSection = (section, i) => {
		const { allowToggle, headerLevel, expandedSections } = this.props;
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
					ref={ this.triggerRefs[i] }
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
