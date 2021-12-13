import React from 'react';
import PropTypes from 'prop-types';

//Misc.
import { validateHeaderLevelProp } from 'src/Accordion/utils';

const AccordionHeader = React.forwardRef(function AccordionHeader(props, ref) {
	const {
		headerLevel, children, id, panelId, onClick, onKeyDown,
		isExpanded, isDisabled, index,
	} = props;
	const HeaderElement = `h${headerLevel}`;

	return (
		<HeaderElement>
			<button
				id={ id }
				type="button"
				aria-controls={ panelId }
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				data-index={ index }
				ref={ ref }
				onClick={ onClick }
				onKeyDown={ onKeyDown }
			>
				{ children }
			</button>
		</HeaderElement>
	);
});

AccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	panelId: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	headerLevel: validateHeaderLevelProp.isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
};

AccordionHeader.defaultProps = {
	isExpanded: false,
	isDisabled: false,
};

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
