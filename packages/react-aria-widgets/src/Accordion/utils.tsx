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

export const defaultRenderHeader: RenderHeader = (index, props) => {
  const { sections, headerElementType = AccordionHeader, headerProps = {} } = props;
  const section = sections[index];
  const { renderHeaderContent, headerElementType: individualHeaderElementType } = section;
  const HeaderElementType = individualHeaderElementType ? individualHeaderElementType : headerElementType;
  const children = typeof renderHeaderContent === 'function' ? renderHeaderContent(props) : renderHeaderContent;

  return (
    <HeaderElementType
      index={ index }
      {...props}
      {...headerProps}
    >
      { children }
    </HeaderElementType>
  );
};

export const defaultRenderPanel: RenderPanel = (index, props) => {
  const { sections, panelElementType = AccordionPanel, panelProps = {} } = props;
  const section = sections[index];
  const { renderPanelContent, panelElementType: individualPanelElementType } = section;
  const PanelElementType = individualPanelElementType ? individualPanelElementType : panelElementType;
  const children = typeof renderPanelContent === 'function' ? renderPanelContent(props) : renderPanelContent;

  return (
    <PanelElementType
      index={ index }
      {...props}
      {...panelProps}
    >
      { children }
    </PanelElementType>
  );
};

export const VALID_PANEL_TAGS = ['section', 'div'] as const;
