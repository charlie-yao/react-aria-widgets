/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Hooks
import useAccordionContext from 'src/Accordion/useAccordionContext';
import useAccordionItemContext from 'src/Accordion/useAccordionItemContext';

//Types
import type { AccordionPanelProps, ValidPanelElements } from 'src/Accordion/types';

//Misc.
import { VALID_PANEL_ELEMENTS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

function AccordionPanel<C extends ValidPanelElements = typeof DEFAULT_PANEL_ELEMENT>({
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
  const Component: ValidPanelElements = as ? as : DEFAULT_PANEL_ELEMENT;
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
    <BaseAccordionPanel<typeof Component>
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
  as: PropTypes.oneOf(VALID_PANEL_ELEMENTS),
};

export default AccordionPanel;
