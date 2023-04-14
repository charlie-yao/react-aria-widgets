import React from 'react';

//Types
import { Props } from 'src/types';

//Misc.
import { VALID_PANEL_TAGS } from 'src/Accordion/utils';

export type HeaderRef = HTMLButtonElement | HTMLElement | null;

export interface SetHeaderRef {
  (ref: HeaderRef): void;
};

export interface Section {
  id: string;
  renderHeader?: RenderHeader;
  renderPanel?: RenderPanel;
  renderHeaderContent: React.ReactNode | RenderHeaderContent;
  renderPanelContent: React.ReactNode | RenderPanelContent;
  headerProps?: Props;
  panelProps?: Props;
  headerElementType?: React.ElementType;
  panelElementType?: React.ElementType;
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

export interface RenderHeaderContent {
  (index: number, props: AccordionProps, headerProps: Props): React.ReactNode;
};

export interface RenderPanelContent {
  (index: number, props: AccordionProps, panelProps: Props): React.ReactNode;
};

export type ValidPanelTags = typeof VALID_PANEL_TAGS[number];

export interface AccordionManagerProps {
  allowMultiple?: boolean;
  allowToggle?: boolean;
};

export interface AccordionManagerState {
  expandedSections: Set<string>;
};

export interface AccordionManagerConsumerProps extends Required<AccordionManagerProps> {
  getIsExpanded: (id: string) => boolean;
  getIsDisabled: (id: string) => boolean;
  toggleSection: (id: string) => void;
  setHeaderRef: SetHeaderRef;
  focusHeader: (index: number) => void;
  focusPrevHeader: (index: number) => void;
  focusNextHeader: (index: number) => void;
  focusFirstHeader: () => void;
  focusLastHeader: () => void;
};

export interface AccordionProps extends AccordionManagerConsumerProps {
  //section?: Section;
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

export interface AccordionHeaderProps extends AccordionProps {
  children: React.ReactNode;
  headerProps?: object;
  buttonProps?: object;
  index: number;
};

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  index: number;
  sections: Section[];
  getIsExpanded: (id: string) => boolean;
  //Not needed below
  headerLevel?: number;
  allowMultiple?: any;
  allowToggle?: any;
  getIsDisabled?: any;
  toggleSection?: any;
  setHeaderRef?: any;
  focusHeader?: any;
  focusPrevHeader?: any;
  focusNextHeader?: any;
  focusFirstHeader?: any;
  focusLastHeader?: any;
};

export interface BaseAccordionHeaderProps {
  children: React.ReactNode;
  id?: string;
  controlsId: string;
  headerLevel: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  isExpanded?: boolean;
  isDisabled?: boolean;
  headerProps?: object;
  buttonProps?: object;
};

export interface BaseAccordionPanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
  labelId?: string;
  tagName?: ValidPanelTags;
  className?: string;
};
