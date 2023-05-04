/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type { BaseAccordionPanelProps } from 'src/Accordion/types';

//Misc.
import { VALID_PANEL_TAGS } from 'src/Accordion/utils';

function BaseAccordionPanel({
  children,
  id,
  labelId = undefined,
  tagName = 'section',
  className = undefined,
  ...rest
}: BaseAccordionPanelProps) {
  const Component = tagName;

  return (
    <Component
      id={ id }
      aria-labelledby={ labelId }
      className={ className }
      { ...rest }
    >
      { children }
    </Component>
  );
}

BaseAccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string,
  tagName: PropTypes.oneOf(VALID_PANEL_TAGS),
  className: PropTypes.string,
};

export default BaseAccordionPanel;
