/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

const BaseAccordionHeader = React.forwardRef((props, ref) => {
	const {
		children, id, controlsId, headerLevel, onClick, onKeyDown,
		isExpanded, isDisabled, headerProps, buttonProps,
	} = props;
	const HeaderElement = `h${headerLevel}`;

	return (
		<HeaderElement { ...headerProps }>
			<button
				type="button"
				id={ id }
				aria-controls={ controlsId }
				onClick={ onClick }
				onKeyDown={ onKeyDown }
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				ref={ ref }
				{ ...buttonProps }
			>
				{ children }
			</button>
		</HeaderElement>
	);
});

BaseAccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	controlsId: PropTypes.string.isRequired,
	headerLevel: validateHeaderLevelProp.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	headerProps: PropTypes.object,
	buttonProps: PropTypes.object,
};

BaseAccordionHeader.defaultProps = {
	isExpanded: false,
	isDisabled: false,
	headerProps: {},
	buttonProps: {},
};

BaseAccordionHeader.displayName = 'BaseAccordionHeader';

export default BaseAccordionHeader;
