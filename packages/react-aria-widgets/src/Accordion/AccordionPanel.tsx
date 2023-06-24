/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionPanel from 'src/Accordion/BaseAccordionPanel';

//Types
import { accordionSectionProp } from 'src/Accordion/propTypes';
import type { AccordionPanelProps, ValidPanelTags } from 'src/Accordion/types';

//Misc.
import { getPanelId, VALID_PANEL_TAGS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

//function AccordionPanel<C extends ValidPanelTags>({
function AccordionPanel<C extends ValidPanelTags = typeof DEFAULT_PANEL_ELEMENT>({
//function AccordionPanel<C extends React.ElementType = typeof DEFAULT_PANEL_ELEMENT>({
  children,
  className = '',
  as,
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
}: AccordionPanelProps<C>) {
  //const _as = as;
  //const _as = as!;
  //const _as: ValidPanelTags = as;
  //const _as: ValidPanelTags = as!;
  const _as: ValidPanelTags = as ? as : DEFAULT_PANEL_ELEMENT;
  //const _as = as ? as : DEFAULT_PANEL_ELEMENT;
  //const _as: ValidPanelTags = as ? as : 'div';
  const section = sections[index];
  const { id } = section;
  const isExpanded = getIsExpanded(id);

  return (
    <BaseAccordionPanel<typeof _as>
      { ...rest }
      id={ getPanelId(id) }
      labelId={ id }
      className={ `${className} ${isExpanded ? '' : 'react-aria-widgets-hidden'}` }
      as={ _as }
    >
      { children }
    </BaseAccordionPanel>
  );
}

function Test() {
  return (
    <>
      <AccordionPanel />
      <AccordionPanel as="section" />
      <AccordionPanel as="div" />
      <AccordionPanel as="section" type="lol" />
      <AccordionPanel as="button" />
      <AccordionPanel as="button" type="lol" />
      <AccordionPanel as="button" type="button" />
      <AccordionPanel as="form" type="button" href="lol"/>
      <AccordionPanel as="ul" type="rofl" />
      <AccordionPanel href="lol" />
    </>
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
