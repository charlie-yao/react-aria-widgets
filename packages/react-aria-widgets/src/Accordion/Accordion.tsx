import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//HOCs
import withAccordionManager from 'src/Accordion/withAccordionManager';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

//Types
import { AccordionManagerConsumerProps } from 'src/Accordion/withAccordionManager';

interface AccordionProps extends AccordionManagerConsumerProps {
  sections: Section[];
  headerLevel?: number;
  renderSection?: RenderSection;
};

interface Section {
  id: string;
  renderHeader: (props: any) => React.ReactNode;
  renderPanel: (props: any) => React.ReactNode;
};

interface RenderSection {
  (
    section: Section,
    index: number,
    props: any
  ): React.ReactNode;
};

const defaultRenderSection: RenderSection = (section, index, props) => {
  const { id, renderHeader, renderPanel } = section;
  const childProps = {
    id,
    index,
    ...props,
  };

  return (
    <Fragment key={ id }>
      { renderHeader(childProps) }
      { renderPanel(childProps) }
    </Fragment>
  );
};

function Accordion(props: AccordionProps) {
  const {
    sections,
    renderSection = defaultRenderSection,
    ...rest
  } = props;

  const renderedSections = sections.map((section, index) => {
    return renderSection(section, index, rest);
  });
  
  return (
    <>
      { renderedSections }
    </>
  );
}

Accordion.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      renderHeader: PropTypes.func.isRequired,
      renderPanel: PropTypes.func.isRequired,
    }).isRequired
  ).isRequired,
  headerLevel: validateHeaderLevelProp,
  renderSection: PropTypes.func,
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
