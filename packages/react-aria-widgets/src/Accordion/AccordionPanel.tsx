/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

interface AccordionPanelProps {
  children: React.ReactNode;
  id: string;
  getIsExpanded: (id: string) => boolean;
  className?: string;
  index: number;
  headerLevel: number;
  onClick: any;
  onKeyDown: any;
  allowMultiple: any;
  allowToggle: any;
  getIsDisabled: any;
  toggleSection: any;
  setHeaderRef: any;
  focusHeader: any;
  focusPrevHeader: any;
  focusNextHeader: any;
  focusFirstHeader: any;
  focusLastHeader: any;
}

function AccordionPanel(props: AccordionPanelProps) {
  const {
    children,
    id,
    getIsExpanded,
    className = '',
    //Pull out props received from <AccordionSection> that shouldn't get passed down
    /* eslint-disable no-unused-vars, react/prop-types */
    index,
    headerLevel,
    onClick,
    onKeyDown,
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
  id: PropTypes.string.isRequired,
  getIsExpanded: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AccordionPanel;
