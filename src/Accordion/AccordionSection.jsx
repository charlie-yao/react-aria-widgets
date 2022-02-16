import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

class AccordionSection extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	};

	static defaultProps = {
	};

	//---- Rendering ----
	render() {
		const { children, id, onClick, onKeyDown, index, isExpanded, isDisabled, setSectionRef } = this.props;
		const section = React.Children.map(children, (child) => {
			const { type, props } = child;

			if(type === AccordionHeader) {
				return React.cloneElement(child, {
					id,
					controlsId: this.getPanelId(),
					onClick,
					onKeyDown,
					index,
					isExpanded,
					isDisabled,
					ref: setSectionRef,
				});
			}
			else if(type === AccordionPanel) {
				return React.cloneElement(child, {
					id: this.getPanelId(id),
					labelId: id,
					isExpanded,
				});
			}
			else
				throw new Error('Only <AccordionHeader> and <AccordionPanel> are valid children of <AccordionSection>.');
		});
		
		return section;
	}

	//---- Misc. ----
	getPanelId = () => {
		const { id } = this.props;
		return `${id}-panel`;
	};
}

export default AccordionSection;
