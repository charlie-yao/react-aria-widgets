import React, { Fragment } from 'react';

//Types
import type {
  RenderSection,
  RenderHeader,
  RenderPanel,
} from 'src/Accordion/types';

/**
 * Gets the ID of an accordion panel based on the accordion's ID.
 */
export function getPanelId(id: string) {
  return `${id}-panel`;
}

export const defaultRenderSection: RenderSection = (index, props, accordionMethods) => {
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
      { _renderHeader(index, props, accordionMethods) }
      { _renderPanel(index, props, accordionMethods) }
    </Fragment>
  );
};

export const defaultRenderHeader: RenderHeader = (index, accordionProps, accordionMethods) => {
  /* eslint-disable react/jsx-props-no-spreading */

  const {
    sections,
    headerElementType,
    headerProps = {},
  } = accordionProps;

  const {
    renderHeaderContent,
    headerElementType: indvHeaderElementType,
    headerProps: indvHeaderProps,
  } = sections[index];

  const HeaderElementType = indvHeaderElementType ? indvHeaderElementType : headerElementType;
  const _headerProps = indvHeaderProps ? indvHeaderProps : headerProps;
  let children;

  if(typeof renderHeaderContent === 'function')
    children = renderHeaderContent(index, accordionProps, accordionMethods);
  else
    children = renderHeaderContent;

  return (
    <HeaderElementType
      index={ index }
      { ...accordionProps }
      { ..._headerProps }
      { ...accordionMethods }
    >
      { children }
    </HeaderElementType>
  );

  /* eslint-enable react/jsx-props-no-spreading */
};

export const defaultRenderPanel: RenderPanel = (index, accordionProps, accordionMethods) => {
  /* eslint-disable react/jsx-props-no-spreading */

  const {
    sections,
    panelElementType,
    panelProps = {},
  } = accordionProps;

  const {
    renderPanelContent,
    panelElementType: indvPanelElementType,
    panelProps: indvPanelProps,
  } = sections[index];

  const PanelElementType = indvPanelElementType ? indvPanelElementType : panelElementType;
  const _panelProps = indvPanelProps ? indvPanelProps : panelProps;
  let children;

  if(typeof renderPanelContent === 'function')
    children = renderPanelContent(index, accordionProps, accordionMethods);
  else
    children = renderPanelContent;

  return (
    <PanelElementType
      index={ index }
      { ...accordionProps }
      { ..._panelProps }
      { ...accordionMethods }
    >
      { children }
    </PanelElementType>
  );

  /* eslint-enable react/jsx-props-no-spreading */
};

export const VALID_PANEL_TAGS = [ 'button', 'section', 'div', 'form' ] as const;
export const DEFAULT_PANEL_ELEMENT = VALID_PANEL_TAGS[1];
