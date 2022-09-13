import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//HOCs
import withNoOp from 'src/hocs/withNoOp';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

function AccordionSection(props) {
	const {
		children,
		id,
		index,
		headerLevel,
		onClick,
		onKeyDown,
		allowMultiple,
		allowToggle,
		getIsExpanded,
		getIsDisabled,
		toggleSection,
		setHeaderRef,
		focusHeader,
		focusPrevHeader,
		focusNextHeader,
		focusFirstHeader,
		focusLastHeader,
	} = props;

	if(typeof children === 'function') {
		return children({
			id,
			index,
			headerLevel,
			onClick,
			onKeyDown,
			allowMultiple,
			allowToggle,
			getIsExpanded,
			getIsDisabled,
			toggleSection,
			setHeaderRef,
			focusHeader,
			focusPrevHeader,
			focusNextHeader,
			focusFirstHeader,
			focusLastHeader,
		});
	}
	else {
		return React.Children.map(children, child => {
			return React.cloneElement(child, {
				id,
				index,
				headerLevel,
				onClick,
				onKeyDown,
				allowMultiple,
				allowToggle,
				getIsExpanded,
				getIsDisabled,
				toggleSection,
				setHeaderRef,
				focusHeader,
				focusPrevHeader,
				focusNextHeader,
				focusFirstHeader,
				focusLastHeader,
			});
		});
	}
}

AccordionSection.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.func,
	]).isRequired,
	id: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	headerLevel: validateHeaderLevelProp.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	allowMultiple: PropTypes.bool.isRequired,
	allowToggle: PropTypes.bool.isRequired,
	getIsExpanded: PropTypes.func.isRequired,
	getIsDisabled: PropTypes.func.isRequired,
	toggleSection: PropTypes.func.isRequired,
	setHeaderRef: PropTypes.func.isRequired,
	focusHeader: PropTypes.func.isRequired,
	focusPrevHeader: PropTypes.func.isRequired,
	focusNextHeader: PropTypes.func.isRequired,
	focusFirstHeader: PropTypes.func.isRequired,
	focusLastHeader: PropTypes.func.isRequired,
};

export default withNoOp(AccordionSection);
