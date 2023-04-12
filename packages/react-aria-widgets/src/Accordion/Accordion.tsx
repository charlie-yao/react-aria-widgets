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
  renderHeader: (props: any) => React.ReactElement;
  renderPanel: (props: any) => React.ReactElement;
};

interface RenderSection {
  (
    section: Section,
    index: number,
    props: any
  ): React.ReactElement;
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

class Accordion extends React.Component<AccordionProps> {
  static propTypes = {
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

  static defaultProps = {
    headerLevel: 2,
    renderSection: defaultRenderSection,
  };

  //---- Rendering ----
  render() {
    const {
      sections,
      renderSection = defaultRenderSection,
      ...rest
    } = this.props;

    return sections.map((section, index) => {
      return renderSection(section, index, rest);
    });
  }
}

export default withAccordionManager(Accordion);
