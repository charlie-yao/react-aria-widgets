/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import { BaseAccordionPanelProps } from 'src/Accordion/types';

//Misc.
import { VALID_PANEL_TAGS } from 'src/Accordion/utils';

function BaseAccordionPanel(props: BaseAccordionPanelProps) {
  const {
    children,
    id,
    labelId,
    tagName = 'section',
    className,
    ...rest
  } = props;

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
