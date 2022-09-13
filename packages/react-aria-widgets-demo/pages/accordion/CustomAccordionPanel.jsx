/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { BaseAccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

function CustomAccordionPanel(props) {
	const {
		children,
		id,
		getIsExpanded,
		className,
		//Pull out the props from <AccordionSection> that shouldn't get passed down
		/* eslint-disable no-unused-vars, react/prop-types */
		index,
		headerLevel,
		onClick,
		onKeyDown,
		allowMultiple,
		allowToggle,
		getIsDisabled,
		toggleSection,
		setHeaderRef,
		focusHeader,
		focusPrevHeader,
		focusNextHeader,
		focusFirstHeader,
		focusLastHeader,
		/* eslint-enable no-unused-vars, react/prop-types */
		...rest
	} = props;
	const panelId = `${id}-panel`;
	const isExpanded = getIsExpanded(id);
	const _className = `defaultPanelClass ${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}`;

	return (
		<BaseAccordionPanel
			id={ panelId }
			labelId={ id }
			className={ _className }
			{ ...rest }
		>
			{ children }
		</BaseAccordionPanel>
	);
}

CustomAccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	getIsExpanded: PropTypes.func.isRequired,
	className: PropTypes.string,
};

CustomAccordionPanel.defaultProps = {
	className: '',
};

export default CustomAccordionPanel;
