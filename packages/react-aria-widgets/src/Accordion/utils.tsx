import React, { Fragment } from 'react';

//Components
import AccordionHeader from 'src/Accordion/AccordionHeader';
import AccordionPanel from 'src/Accordion/AccordionPanel';

//Types
import {
  RenderSection,
  RenderHeader,
  RenderPanel
} from 'src/Accordion/types';

/**
 * Gets the ID of an accordion panel based on the accordion's ID.
 */
export function getPanelId(id: string): string {
  return `${id}-panel`;
}

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

export const defaultRenderHeader: RenderHeader = (index, accordionProps) => {
  const {
    sections,
    headerElementType = AccordionHeader,
    headerProps = {}
  } = accordionProps;

  const {
    renderHeaderContent,
    headerElementType: indvHeaderElementType,
    headerProps: indvHeaderProps = {}
  } = sections[index];

  const HeaderElementType = indvHeaderElementType ? indvHeaderElementType : headerElementType;
  const children = typeof renderHeaderContent === 'function' ? renderHeaderContent(accordionProps) : renderHeaderContent;
  const combinedHeaderProps = { ...headerProps, ...indvHeaderProps };

  return (
    <HeaderElementType
      index={ index }
      {...accordionProps}
      {...combinedHeaderProps}
    >
      { children }
    </HeaderElementType>
  );
};

export const defaultRenderPanel: RenderPanel = (index, accordionProps) => {
  const {
    sections,
    panelElementType = AccordionPanel,
    panelProps = {},
  } = accordionProps;

  const {
    renderPanelContent,
    panelElementType: indvPanelElementType,
    panelProps: indvPanelProps = {},
  } = sections[index];

  const PanelElementType = indvPanelElementType ? indvPanelElementType : panelElementType;
  const children = typeof renderPanelContent === 'function' ? renderPanelContent(accordionProps) : renderPanelContent;
  const combinedPanelProps = { ...panelProps, ...indvPanelProps };

  return (
    <PanelElementType
      index={ index }
      {...accordionProps}
      {...combinedPanelProps}
    >
      { children }
    </PanelElementType>
  );
};

export const VALID_PANEL_TAGS = ['section', 'div'] as const;
