import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

export const AccordionSectionContext = React.createContext();

class AccordionSection extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	};

	//---- Rendering ----
	render() {
		const { children, id, onKeyDown, index, setSectionRef } = this.props;
		const section = React.Children.map(children, (child) => {
			const { type, props } = child;

			if(type === AccordionHeader) {
				return React.cloneElement(child, {
					onKeyDown,
					index,
					ref: setSectionRef,
				});
			}
			else if(type === AccordionPanel)
				return child;
			else
				throw new Error('Only <AccordionHeader> and <AccordionPanel> are valid children of <AccordionSection>.');
		});
		
		//return section;

		return (
			<AccordionSectionContext.Provider value={{
				id,
				panelId: this.getPanelId(id),
			}}>
				{ children }
			</AccordionSectionContext.Provider>
		);
	}

	//---- Misc. ----
	getPanelId = (id) => {
		return `${id}-panel`;
	};
}

export default AccordionSection;
