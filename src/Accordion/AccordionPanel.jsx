import React, { useContext } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';
import { AccordionContext } from 'src/Accordion';

//HOCs
import { createNoOpHOC } from 'src/utils';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionPanel(props) {
	//const { children, id, className } = props;
	//const { getIsExpanded } = useContext(AccordionContext);
	//const isExpanded = getIsExpanded(id);

	const { children, id, className, isExpanded } = props;

	if(typeof children === 'function')
		return children(props);
	else {
		return (
			<BaseAccordionPanel
				id={ getPanelId(id) }
				labelId={ id }
				className={ `${className} ${isExpanded ? '' : 'hidden'}` }
			>
				{ children }
			</BaseAccordionPanel>
		);
	}
}

/*
 * TODO:
 * In an attempt to have an unopinionated isExpanded...
 * would it make sense to have a component that automatically
 * rendered <BaseAccordionPanel> and also automatically accepts
 * isExpanded (from AccordionSection? HOC that wraps component
 * in an AccordionContext.Consumer?)?
 *
 * <AccordionSection>
 *		<AccordionHeader>
 *			Section 1
 *		</AccordionHeader>
 *		<CustomAccordionPanel>
 *			Section 1 Content
 *		</CustomAccordionPanel>
 * </AccordionSection>
 *
 * I'm thinking... I don't necessarily want to implement
 * hiding the panel because it's somewhat opinionated
 * (class name, do it via styles, etc.)...
 */

AccordionPanel.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.func,
	]).isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	className: '',
};

export default createNoOpHOC(AccordionPanel);
