import React from 'react';
import PropTypes from 'prop-types';

//HOCs
import withAccordionManager from 'src/Accordion/withAccordionManager';

//Types
import { validateHeaderLevelProp } from 'src/utils/propTypes';
import { accordionSectionProp } from 'src/Accordion/propTypes';
import { AccordionProps } from 'src/Accordion/types';

//Misc.
import { defaultRenderSection } from 'src/Accordion/utils';

function Accordion(props: AccordionProps) {
  const { sections, renderSection = defaultRenderSection } = props;
  const renderedSections = sections.map((section, index) => {
    return renderSection(index, props);
  });
  
  return (
    <>
      { renderedSections }
    </>
  );
}

Accordion.propTypes = {
  sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  headerLevel: validateHeaderLevelProp.isRequired,
  renderSection: PropTypes.func,
  renderHeader: PropTypes.func,
  renderPanel: PropTypes.func,
  headerProps: PropTypes.object,
  panelProps: PropTypes.object,
  headerElementType: PropTypes.elementType.isRequired,
  panelElementType: PropTypes.elementType.isRequired,
  //From <AccordionManager>
  allowMultiple: PropTypes.bool.isRequired,
  allowToggle: PropTypes.bool.isRequired,
  getIsExpanded: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func.isRequired,
  toggleSection: PropTypes.func.isRequired,
  setHeaderRef: PropTypes.func.isRequired,
  focusHeader: PropTypes.func.isRequired,
  focusPrevHeader: PropTypes.func.isRequired,
  focusNextHeader: PropTypes.func.isRequired,
  focusFirstHeader: PropTypes.func.isRequired,
  focusLastHeader: PropTypes.func.isRequired,
};

export default withAccordionManager(Accordion);
