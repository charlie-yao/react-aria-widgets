import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//HOCs
import withAccordionManager from 'src/Accordion/withAccordionManager';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

//Types
import { AccordionManagerConsumerProps } from 'src/Accordion/withAccordionManager';

interface AccordionProps extends AccordionManagerConsumerProps {
  sections: AccordionSectionDescriptor[];
  headerLevel: number;
  renderSection: RenderSection;
};

interface AccordionSectionDescriptor {
  id: string;
  renderHeader: (props: any) => React.ReactElement;
  renderPanel: (props: any) => React.ReactElement;
};

interface RenderSection {
  (
    section: AccordionSectionDescriptor,
    index: number,
    props: any
  ): React.ReactElement;
};

class Accordion extends React.Component<AccordionProps> {
  static propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      renderHeader: PropTypes.func.isRequired,
      renderPanel: PropTypes.func.isRequired,
    })).isRequired,
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
    renderSection: ((section, index, props) => {
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
    }) as RenderSection,
  };

  //---- Rendering ----
  render() {
    const { sections, renderSection, ...rest } = this.props;

    return sections.map((section, index) => {
      return renderSection(section, index, rest);
    });
  }
}

export default withAccordionManager(Accordion);
