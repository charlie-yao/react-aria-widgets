/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type { BaseAccordionPanelProps, TForwardedBaseAccordionPanel } from 'src/Accordion/types';
import type { PolymorphicRef } from 'src/utils/types';

//Misc.
import { VALID_PANEL_TAGS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

function BaseAccordionPanel<C extends React.ElementType = typeof DEFAULT_PANEL_ELEMENT>(
  {
    children,
    as,
    id,
    labelId,
    ...rest
  }: BaseAccordionPanelProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = as ? as : DEFAULT_PANEL_ELEMENT;

  return (
    <Component
      { ...rest }
      id={ id }
      aria-labelledby={ labelId }
      ref={ ref }
    >
      { children }
    </Component>
  );
}

const ForwardedBaseAccordionPanel: TForwardedBaseAccordionPanel = React.forwardRef(BaseAccordionPanel); 

ForwardedBaseAccordionPanel.propTypes = {
  children: PropTypes.node,
  as: PropTypes.oneOf(VALID_PANEL_TAGS),
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string,
};

ForwardedBaseAccordionPanel.defaultProps = {
  as: DEFAULT_PANEL_ELEMENT,
};

export default ForwardedBaseAccordionPanel;
