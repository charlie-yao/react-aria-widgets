import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';
import { AccordionContext } from 'src/Accordion';

const AccordionHeader = React.forwardRef((props, ref) => {
	const {
		children, id, controlsId, onKeyDown, index,
		headerProps, buttonProps,
	} = props;

	const _buttonProps = Object.assign({}, buttonProps, {
		'data-index': index,
	});

	const renderChildren = value => {
		const { headerLevel, toggleSection, allowToggle, expandedSections } = value;
		const isExpanded = expandedSections.has(id);
		const isDisabled = !allowToggle && isExpanded;
		const onClick = (event) => {
			toggleSection(event.target.id);
		};

		return (
			<BaseAccordionHeader
				id={ id }
				controlsId={ controlsId }
				onClick={ onClick }
				onKeyDown={ onKeyDown }
				headerLevel={ headerLevel }
				isExpanded={ isExpanded }
				isDisabled={ isDisabled }
				headerProps={ headerProps }
				buttonProps={ _buttonProps }
				ref={ ref }
			>
				{ children }
			</BaseAccordionHeader>
		);
	};

	return (
		<AccordionContext.Consumer>
			{ renderChildren }
		</AccordionContext.Consumer>
	);
});

AccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	controlsId: PropTypes.string.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

AccordionHeader.defaultProps = {
	headerProps: {},
	buttonProps: {},
};

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
