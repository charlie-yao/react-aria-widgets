/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Contexts
import AccordionContext from 'src/Accordion/AccordionContext';
import AccordionSectionContext from 'src/Accordion/AccordionSectionContext';

//Types
import type { AccordionPanelProps, ValidPanelElements } from 'src/Accordion/types';

//Misc.
import { getPanelId, VALID_PANEL_ELEMENTS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

function AccordionPanel<C extends ValidPanelElements = typeof DEFAULT_PANEL_ELEMENT>({
  children,
  className = '',
  as, //eslint-disable-line react/require-default-props
  ...rest
}: AccordionPanelProps<C>) {
  const accordionContext = useContext(AccordionContext);
  const id = useContext(AccordionSectionContext);

  if(!accordionContext)
    throw new Error('React ARIA Widgets - AccordionHeader received a falsy value when consuming an AccordionContext');
  if(!id)
    throw new Error('React ARIA Widgets - AccordionHeader received a falsy value when consuming an AccordionSectionContext');

  const { getIsExpanded } = accordionContext;
  const Component: ValidPanelElements = as ? as : DEFAULT_PANEL_ELEMENT;
  const isExpanded = getIsExpanded(id);

  return (
    <BaseAccordionPanel<typeof Component>
      { ...rest }
      id={ getPanelId(id) }
      labelId={ id }
      className={ `${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
      as={ Component }
    >
      { children }
    </BaseAccordionPanel>
  );
}

AccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.oneOf(VALID_PANEL_ELEMENTS),
};

export default AccordionPanel;
