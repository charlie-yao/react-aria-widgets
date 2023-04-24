import React, { Fragment } from 'react';

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
  const {
    sections,
    renderHeader = defaultRenderHeader,
    renderPanel = defaultRenderPanel,
  } = props;
  
  const {
    id,
    renderHeader: renderIndvHeader,
    renderPanel: renderIndvPanel,
  } = sections[index];
  
  const _renderHeader = renderIndvHeader ? renderIndvHeader : renderHeader;
  const _renderPanel = renderIndvPanel ? renderIndvPanel : renderPanel;

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
    headerElementType,
    headerProps = {}
  } = accordionProps;

  const {
    renderHeaderContent,
    headerElementType: indvHeaderElementType,
    headerProps: indvHeaderProps = {}
  } = sections[index];

  const HeaderElementType = indvHeaderElementType ? indvHeaderElementType : headerElementType;
  const combinedHeaderProps = { ...headerProps, ...indvHeaderProps };
  let children;

  if(typeof renderHeaderContent === 'function')
    children = renderHeaderContent(index, accordionProps);
  else
    children = renderHeaderContent;

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
    panelElementType,
    panelProps = {},
  } = accordionProps;

  const {
    renderPanelContent,
    panelElementType: indvPanelElementType,
    panelProps: indvPanelProps = {},
  } = sections[index];

  const PanelElementType = indvPanelElementType ? indvPanelElementType : panelElementType;
  const combinedPanelProps = { ...panelProps, ...indvPanelProps };
  let children;

  if(typeof renderPanelContent === 'function')
    children = renderPanelContent(index, accordionProps);
  else
    children = renderPanelContent;

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
