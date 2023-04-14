import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//HOCs
import withAccordionManager from 'src/Accordion/withAccordionManager';

//Components
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

//Types
import { AccordionManagerConsumerProps } from 'src/Accordion/withAccordionManager';

export interface Props {
  [key: string]: any;
};

export interface AccordionProps extends AccordionManagerConsumerProps {
  sections: Section[];
  headerLevel: number;
  renderSection?: RenderSection;
  renderHeader?: RenderHeader;
  renderPanel?: RenderPanel;
  headerProps?: Props;
  panelProps?: Props;
  headerElementType?: React.ElementType;
  panelElementType?: React.ElementType;
};

export interface Section {
  id: string;
  renderHeader?: RenderHeader | null;
  renderPanel?: RenderPanel | null;
  renderHeaderContent: React.ReactNode | ((props: any) => React.ReactNode);
  renderPanelContent: React.ReactNode | ((props: any) => React.ReactNode);
};

export interface RenderSection {
  (index: number, props: AccordionProps): React.ReactNode;
};

export interface RenderHeader {
  (index: number, props: AccordionProps): React.ReactNode;
};

export interface RenderPanel {
  (index: number, props: AccordionProps): React.ReactNode;
};

export const sectionPropType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  renderHeader: PropTypes.func,
  renderPanel: PropTypes.func,
  renderHeaderContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  renderPanelContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
});

export const defaultRenderSection: RenderSection = (index, props) => {
  const { sections, renderHeader = defaultRenderHeader, renderPanel = defaultRenderPanel } = props;
  const section = sections[index];
  const { id, renderHeader: renderIndividualHeader, renderPanel: renderIndividualPanel } = section;
  const _renderHeader = renderIndividualHeader ? renderIndividualHeader : renderHeader;
  const _renderPanel = renderIndividualPanel ? renderIndividualPanel : renderPanel;

  return (
    <Fragment key={ id }>
      { _renderHeader(index, props) }
      { _renderPanel(index, props) }
    </Fragment>
  );
};

export const defaultRenderHeader: RenderHeader = (index, props) => {
  const { sections, headerElementType: HeaderElementType = AccordionHeader, headerProps = {} } = props;
  const section = sections[index];
  const { renderHeaderContent } = section;

  return (
    <HeaderElementType index={ index } {...props} {...headerProps}>
      { typeof renderHeaderContent === 'function' ? renderHeaderContent(props) : renderHeaderContent }
    </HeaderElementType>
  );
};

export const defaultRenderPanel: RenderPanel = (index, props) => {
  const { sections, panelElementType: PanelElementType = AccordionPanel, panelProps = {} } = props;
  const section = sections[index];
  const { renderPanelContent } = section;

  return (
    <PanelElementType index={ index } {...props} {...panelProps}>
      { typeof renderPanelContent === 'function' ? renderPanelContent(props) : renderPanelContent }
    </PanelElementType>
  );
};

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
  sections: PropTypes.arrayOf(sectionPropType.isRequired).isRequired,
  headerLevel: validateHeaderLevelProp.isRequired,
  renderSection: PropTypes.func,
  renderHeader: PropTypes.func,
  renderPanel: PropTypes.func,
  headerProps: PropTypes.object,
  panelProps: PropTypes.object,
  headerComponent: PropTypes.elementType,
  panelComponent: PropTypes.elementType,
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
