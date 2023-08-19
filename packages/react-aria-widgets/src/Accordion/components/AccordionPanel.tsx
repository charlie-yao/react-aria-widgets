/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionPanel from './BaseAccordionPanel';

//Hooks
import useAccordionContext from '../hooks/useAccordionContext';
import useAccordionItemContext from '../hooks/useAccordionItemContext';

//Types
import type { PolymorphicComponentPropsWithoutRef } from '../../types';
import type {
  AccordionRenderFunction,
  AccordionRenderClass,
  AccordionRenderStyle,
} from '../types';

//Misc.
import { DEFAULT_ACCORDION_PANEL_ELEMENT } from '../utils';

export type AccordionPanelProps<C extends React.ElementType = typeof DEFAULT_ACCORDION_PANEL_ELEMENT> = PolymorphicComponentPropsWithoutRef<
  C,
  {
    children?: React.ReactNode | AccordionRenderFunction;
    className?: string | AccordionRenderClass;
    style?: React.CSSProperties | AccordionRenderStyle;
  }
>;

function AccordionPanel<C extends React.ElementType = typeof DEFAULT_ACCORDION_PANEL_ELEMENT>({
  children = null,
  className = undefined,
  style = {},
  as, //eslint-disable-line react/require-default-props
  ...rest
}: AccordionPanelProps<C>) {
  const accordionContext = useAccordionContext();
  const accordionItemContext = useAccordionItemContext();
  const {
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    getIsExpanded,
    getIsDisabled,
  } = accordionContext;
  const { id, headerHTMLId, panelHTMLId } = accordionItemContext;
  const Component: React.ElementType = as ? as : DEFAULT_ACCORDION_PANEL_ELEMENT;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const combinedContext = useMemo(() => {
    return {
      ...accordionContext,
      ...accordionItemContext,
    };
  }, [ accordionContext, accordionItemContext ]);

  let _className;
  let _style;

  if(typeof className === 'function')
    _className = className({ allowMultiple, allowCollapseLast, headerLevel, isExpanded, isDisabled });
  else if(typeof className === 'string')
    _className = className;
  else
    _className = 'react-aria-widgets-accordion-panel';

  if(typeof style === 'function')
    _style = style({ allowMultiple, allowCollapseLast, headerLevel, isExpanded, isDisabled });
  else
    _style = style;

  return (
    <BaseAccordionPanel
      { ...rest }
      id={ panelHTMLId }
      aria-labelledby={ headerHTMLId }
      className={ _className }
      style={ _style }
      as={ Component }
      data-expanded={ isExpanded }
      data-disabled={ isDisabled }
    >
      { typeof children === 'function' ? children(combinedContext) : children }
    </BaseAccordionPanel>
  );
}

AccordionPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  as: PropTypes.elementType as React.Validator<React.ElementType>,
};

export default AccordionPanel;
