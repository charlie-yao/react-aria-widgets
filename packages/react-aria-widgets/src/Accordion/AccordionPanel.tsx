/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
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
  children,
  className = '',
  as, //eslint-disable-line react/require-default-props
  ...rest
}: AccordionPanelProps<C>) {
  const { getIsExpanded } = useAccordionContext();
  const { id, headerHTMLId, panelHTMLId } = useAccordionSectionContext();
  const Component: ValidPanelElements = as ? as : DEFAULT_PANEL_ELEMENT;
  const isExpanded = getIsExpanded(id);

  return (
    <BaseAccordionPanel<typeof Component>
      { ...rest }
      id={ panelHTMLId }
      labelId={ headerHTMLId }
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
