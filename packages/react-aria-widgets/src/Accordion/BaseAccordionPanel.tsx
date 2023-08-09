/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type {
  PolymorphicRef,
  PolymorphicComponentPropsWithRef,
  PolymorphicForwardRefComponent,
} from 'src/utils/types';
import type { ValidPanelElements } from 'src/Accordion/types';

//Misc.
import { VALID_PANEL_ELEMENTS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

export interface InternalBaseAccordionPanelProps {
  id: string;
  'aria-labelledby'?: string;
}

export type BaseAccordionPanelProps<C extends React.ElementType = typeof DEFAULT_PANEL_ELEMENT> = PolymorphicComponentPropsWithRef<
  C,
  InternalBaseAccordionPanelProps,
  ValidPanelElements
>;

export type ForwardedBaseAccordionPanelType = PolymorphicForwardRefComponent<
  InternalBaseAccordionPanelProps,
  ValidPanelElements,
  typeof DEFAULT_PANEL_ELEMENT
>;

function BaseAccordionPanel<C extends React.ElementType = typeof DEFAULT_PANEL_ELEMENT>(
  {
    children,
    as,
    id,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  }: BaseAccordionPanelProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = as ? as : DEFAULT_PANEL_ELEMENT;

  return (
    <Component
      { ...rest }
      id={ id }
      aria-labelledby={ ariaLabelledBy }
      ref={ ref }
    >
      { children }
    </Component>
  );
}

const ForwardedBaseAccordionPanel: ForwardedBaseAccordionPanelType = React.forwardRef(BaseAccordionPanel);

ForwardedBaseAccordionPanel.propTypes = {
  children: PropTypes.node,
  as: PropTypes.oneOf(VALID_PANEL_ELEMENTS),
  id: PropTypes.string.isRequired,
  'aria-labelledby': PropTypes.string,
};

ForwardedBaseAccordionPanel.defaultProps = {
  as: DEFAULT_PANEL_ELEMENT,
};

export default ForwardedBaseAccordionPanel;
