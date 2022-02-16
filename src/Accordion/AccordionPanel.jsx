import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';
import { AccordionContext } from 'src/Accordion';

function AccordionPanel(props) {
	const { children, id, labelId, className } = props;
	const renderChildren = value => {
		const { expandedSections } = value;
		const isExpanded = expandedSections.has(labelId);

		return (
			<BaseAccordionPanel
				id={ id }
				labelId={ labelId }
				className={ `${className} ${isExpanded ? '' : 'hidden'}` }
			>
				{ children }
			</BaseAccordionPanel>
		);
	};

	return (
		<AccordionContext.Consumer>
			{ renderChildren }
		</AccordionContext.Consumer>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string.isRequired,
	className: PropTypes.string,
};

AccordionPanel.defaultProps = {
	className: '',
};

export default AccordionPanel;
