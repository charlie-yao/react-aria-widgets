/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Types
import { accordionSectionProp } from 'src/Accordion/propTypes';
import type { AccordionPanelProps } from 'src/Accordion/types';

//Misc.
import { getPanelId, VALID_PANEL_TAGS } from 'src/Accordion/utils';

function AccordionPanel({
  children,
  className = '',
  as = 'section',
  index,
  sections,
  getIsExpanded,
  //Pull out props received from <Accordion> that shouldn't get passed down
  /* eslint-disable @typescript-eslint/no-unused-vars, react/prop-types */
  headerLevel,
  renderSection,
  renderHeader,
  renderPanel,
  headerProps,
  panelProps,
  headerElementType,
  panelElementType,
  allowMultiple,
  allowToggle,
  getIsDisabled,
  toggleSection,
  pushHeaderRef,
  focusHeader,
  focusPrevHeader,
  focusNextHeader,
  focusFirstHeader,
  focusLastHeader,
  /* eslint-enable @typescript-eslint/no-unused-vars, react/prop-types */
  ...rest
}: AccordionPanelProps) {
  const section = sections[index];
  const { id } = section;
  const isExpanded = getIsExpanded(id);

  return (
    <BaseAccordionPanel
      { ...rest }
      id={ getPanelId(id) }
      labelId={ id }
      className={ `${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
      as={ as }
    >
      { children }
    </BaseAccordionPanel>
  );
}

AccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.oneOf(VALID_PANEL_TAGS),
  //From <Accordion>
  index: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  //From <Accordion> methods
  getIsExpanded: PropTypes.func.isRequired,
};

export default AccordionPanel;
