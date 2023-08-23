/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type {
  PolymorphicRef,
  PolymorphicComponentPropsWithRef,
  PolymorphicForwardRefComponent,
} from '../../types';

//Misc.
import { DEFAULT_ACCORDION_PANEL_ELEMENT } from '../utils';

interface InternalBaseAccordionPanelProps {
  id: string;
  'aria-labelledby'?: string | undefined;
}

export type BaseAccordionPanelProps<C extends React.ElementType = typeof DEFAULT_ACCORDION_PANEL_ELEMENT> = PolymorphicComponentPropsWithRef<
  C,
  InternalBaseAccordionPanelProps
>;

export type ForwardedBaseAccordionPanelType = PolymorphicForwardRefComponent<
  InternalBaseAccordionPanelProps,
  typeof DEFAULT_ACCORDION_PANEL_ELEMENT
>;

function BaseAccordionPanel<C extends React.ElementType = typeof DEFAULT_ACCORDION_PANEL_ELEMENT>(
  {
    children,
    as,
    id,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  }: BaseAccordionPanelProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = as ? as : DEFAULT_ACCORDION_PANEL_ELEMENT;

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
  as: PropTypes.elementType as React.Validator<React.ElementType>,
  id: PropTypes.string.isRequired,
  'aria-labelledby': PropTypes.string,
};

ForwardedBaseAccordionPanel.defaultProps = {
  children: null,
  as: DEFAULT_ACCORDION_PANEL_ELEMENT,
  'aria-labelledby': undefined,
};

export default ForwardedBaseAccordionPanel;
