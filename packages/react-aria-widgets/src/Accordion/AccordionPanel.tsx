/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Types
import { accordionSectionProp } from 'src/Accordion/propTypes';
import { AccordionPanelProps } from 'src/Accordion/types';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionPanel(props: AccordionPanelProps) {
  const {
    children,
    className = '',
    tagName = 'section',
    index,
    sections,
    getIsExpanded,
    //Pull out props received from <AccordionSection> that shouldn't get passed down
    /* eslint-disable no-unused-vars, react/prop-types */
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
    setHeaderRef,
    focusHeader,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
    /* eslint-enable no-unused-vars, react/prop-types */
    ...rest
  } = props;
  const section = sections[index];
  const { id } = section;
  const isExpanded = getIsExpanded(id);

  return (
    <BaseAccordionPanel
      { ...rest }
      id={ getPanelId(id) }
      labelId={ id }
      className={ `${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
      tagName={ tagName }
    >
      { children }
    </BaseAccordionPanel>
  );
}

AccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tagName: PropTypes.string,
  //From <Accordion>
  index: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  //From <AccordionManager>
  getIsExpanded: PropTypes.func.isRequired,
};

export default AccordionPanel;
