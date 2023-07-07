/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Contexts
import AccordionContext from 'src/Accordion/AccordionContext';
import AccordionSectionContext from 'src/Accordion/AccordionSectionContext';

//Types
//import { accordionSectionProp } from 'src/Accordion/propTypes';
import type { AccordionPanelProps, ValidPanelElements } from 'src/Accordion/types';

//Misc.
import { getPanelId, VALID_PANEL_ELEMENTS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

function AccordionPanel<C extends ValidPanelElements = typeof DEFAULT_PANEL_ELEMENT>({
  children,
  className = '',
  as, //eslint-disable-line react/require-default-props
  //index,
  //sections,
  //getIsExpanded,
  //Pull out props received from <Accordion> that shouldn't get passed down
  /* eslint-disable @typescript-eslint/no-unused-vars, react/prop-types */
  //headerLevel,
  //renderSection,
  //renderHeader,
  //renderPanel,
  //headerProps,
  //panelProps,
  //headerElementType,
  //panelElementType,
  //allowMultiple,
  //allowToggle,
  //getIsDisabled,
  //toggleSection,
  //pushHeaderRef,
  //focusHeader,
  //focusPrevHeader,
  //focusNextHeader,
  //focusFirstHeader,
  //focusLastHeader,
  /* eslint-enable @typescript-eslint/no-unused-vars, react/prop-types */
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
  //const section = sections[index];
  //const { id } = section;
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
  //From <Accordion>
  //index: PropTypes.number.isRequired,
  //sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  //From <Accordion> methods
  //getIsExpanded: PropTypes.func.isRequired,
};

export default AccordionPanel;
