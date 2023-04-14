/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

import { sectionPropType, Section } from 'src/Accordion/Accordion';

interface AccordionPanelProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  sections: Section[];
  getIsExpanded: (id: string) => boolean;
  //Not needed below
  headerLevel?: number;
  allowMultiple?: any;
  allowToggle?: any;
  getIsDisabled?: any;
  toggleSection?: any;
  setHeaderRef?: any;
  focusHeader?: any;
  focusPrevHeader?: any;
  focusNextHeader?: any;
  focusFirstHeader?: any;
  focusLastHeader?: any;
}

function AccordionPanel(props: AccordionPanelProps) {
  const {
    children,
    className = '',
    index,
    sections,
    getIsExpanded,
    //Pull out props received from <AccordionSection> that shouldn't get passed down
    /* eslint-disable no-unused-vars, react/prop-types */
    headerLevel,
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
      id={ getPanelId(id) }
      labelId={ id }
      className={ `${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
      { ...rest }
    >
      { children }
    </BaseAccordionPanel>
  );
}

AccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  //From <Accordion>
  index: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(sectionPropType.isRequired).isRequired,
  //From <AccordionManager>
  getIsExpanded: PropTypes.func.isRequired,
};

export default AccordionPanel;
