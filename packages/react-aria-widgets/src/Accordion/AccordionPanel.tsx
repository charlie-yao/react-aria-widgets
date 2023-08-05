/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Hooks
import useAccordionContext from 'src/Accordion/useAccordionContext';
import useAccordionSectionContext from 'src/Accordion/useAccordionSectionContext';

//Types
import type { AccordionPanelProps, ValidPanelElements } from 'src/Accordion/types';

//Misc.
import { VALID_PANEL_ELEMENTS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

function AccordionPanel<C extends ValidPanelElements = typeof DEFAULT_PANEL_ELEMENT>({
  children = null,
  className = '',
  as, //eslint-disable-line react/require-default-props
  ...rest
}: AccordionPanelProps<C>) {
  const accordionContext = useAccordionContext();
  const accordionSectionContext = useAccordionSectionContext();
  const { getIsExpanded } = accordionContext;
  const { id, headerHTMLId, panelHTMLId } = accordionSectionContext;
  const Component: ValidPanelElements = as ? as : DEFAULT_PANEL_ELEMENT;
  const isExpanded = getIsExpanded(id);

  const combinedContext = useMemo(() => {
    return {
      ...accordionContext,
      ...accordionSectionContext,
    };
  }, [ accordionContext, accordionSectionContext ]);

  return (
    <BaseAccordionPanel<typeof Component>
      { ...rest }
      id={ panelHTMLId }
      labelId={ headerHTMLId }
      className={ `${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
      as={ Component }
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
  className: PropTypes.string,
  as: PropTypes.oneOf(VALID_PANEL_ELEMENTS),
};

export default AccordionPanel;
