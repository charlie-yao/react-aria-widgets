/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

/*
 * According to WAI-ARIA Authoring Practices 1.2, the container
 * for the panel content can optionally have the role "region"
 * (accomplished by using the <section> tag) and an aria-labelledby
 * attribute that points to the button that controls the panel's
 * display.
 *
 * However, if the "region" role is used (whether through the <section>
 * tag or with the role attribute), according to ARIA 1.2, a label
 * MUST be used. Since BaseAccordionPanel defaults to <section>, then
 * by default, a labelId must be provided.
 *
 * Note: They also suggest "avoid using the 'region' role in
 * circumstances that create landmark region proliferation, e.g.,
 * in an accordion that contains more than approximately 6 panels
 * that can be expanded at the same time."
 *
 * See:
 * https://w3c.github.io/aria-practices/#accordion
 * https://w3c.github.io/aria/#region
 */
function BaseAccordionPanel(props) {
	const { children, id, labelId, tagName: Component, ...rest } = props;

	return (
		<Component id={ id } aria-labelledby={ labelId } { ...rest }>
			{ children }
		</Component>
	);
}

BaseAccordionPanel.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string,
	tagName: PropTypes.string,
};

BaseAccordionPanel.defaultProps = {
	labelId: undefined,
	tagName: 'section',
};

export default BaseAccordionPanel;
