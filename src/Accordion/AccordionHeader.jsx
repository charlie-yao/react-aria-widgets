import React from 'react';
import PropTypes from 'prop-types';

/**
 * Returns a string representing an <h1> to <h6> element.
 * HTML only supports 6 levels, so if the level argument
 * falls outside of those bounds, it will default to <h1>.
 *
 * @param {number} level
 * @returns {string}
 */
function getHeaderElement(level) {
	if(!Number.isInteger(level) || level < 0 || level > 6)
		level = 1;

	return `h${level}`;
}

function AccordionHeader(props) {
	const {
		level, children, id, controlsId, onClick, onKeyDown, isExpanded,
		isDisabled, index, _ref,
	} = props;
	const HeaderElement = getHeaderElement(level);

	return (
		<HeaderElement id={ id }>
			<button
				type="button"
				aria-controls={ controlsId }
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
	controlsId: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	_ref: PropTypes.shape({
		current: PropTypes.object,
	}).isRequired, //TODO Something about this just feels incredibly awkward
	isExpanded: PropTypes.bool,
	isDisabled: PropTypes.bool,
	level: PropTypes.number,
};

AccordionHeader.defaultProps = {
	level: 1,
	isExpanded: true,
	isDisabled: false,
};

export default AccordionHeader;
