import React from 'react';
import PropTypes from 'prop-types';

//Misc.
import { validateLevelProp } from 'src/Accordion/utils';

function AccordionHeader(props) {
	const {
		level, children, id, panelId, onClick, onKeyDown,
		isExpanded, isDisabled, index, _ref,
	} = props;
	const HeaderElement = `h${level}`;

	return (
		<HeaderElement id={ id }>
			<button
				type="button"
				aria-controls={ panelId }
				aria-expanded={ isExpanded }
				aria-disabled={ isDisabled }
				data-index={ index }
				ref={ _ref }
				onClick={ onClick }
				onKeyDown={ onKeyDown }
			>
				{ children }
			</button>
		</HeaderElement>
	);
}

AccordionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	panelId: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	level: validateLevelProp.isRequired,
	_ref: PropTypes.shape({
		current: PropTypes.object,
	}).isRequired,
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
};

AccordionHeader.defaultProps = {
	isExpanded: false,
	isDisabled: false,
};

export default AccordionHeader;
