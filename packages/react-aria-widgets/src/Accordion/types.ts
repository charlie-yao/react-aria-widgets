import type React from 'react';

//Types
import type { Props, ValidHTMLHeaderLevels } from 'src/utils/types';

//Misc.
import type { VALID_PANEL_TAGS } from 'src/Accordion/utils';

export type HeaderRef = HTMLButtonElement | HTMLElement | null;

export interface Section {
  id: string;
  renderHeaderContent: React.ReactNode | RenderHeaderContent;
  renderPanelContent: React.ReactNode | RenderPanelContent;
  renderHeader?: RenderHeader | null | undefined;
  renderPanel?: RenderPanel | null | undefined;
  headerProps?: Props | null | undefined;
  panelProps?: Props | null | undefined;
  headerElementType?: React.ElementType | string | null | undefined; //eslint-disable-line @typescript-eslint/no-redundant-type-constituents
  panelElementType?: React.ElementType | string | null | undefined; //eslint-disable-line @typescript-eslint/no-redundant-type-constituents
}

export type RenderSection = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;

export type RenderHeader = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;

export type RenderPanel = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;

export type RenderHeaderContent = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;

export type RenderPanelContent = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;

export type ValidPanelTags = typeof VALID_PANEL_TAGS[number];

export interface AccordionProps {
  allowMultiple?: boolean;
  allowToggle?: boolean;
  sections: Section[];
  headerLevel: ValidHTMLHeaderLevels;
  renderSection?: RenderSection;
  renderHeader?: RenderHeader;
  renderPanel?: RenderPanel;
  headerProps?: Props;
  panelProps?: Props;
  headerElementType: React.ElementType | string; //eslint-disable-line @typescript-eslint/no-redundant-type-constituents
  panelElementType: React.ElementType | string; //eslint-disable-line @typescript-eslint/no-redundant-type-constituents
}

export interface AccordionMethods {
  getAllowToggle: () => boolean;
  getIsExpanded: (id: string) => boolean;
  getIsDisabled: (id: string) => boolean;
  toggleSection: (id: string) => void;
  pushHeaderRef: (ref: HeaderRef) => void;
  focusHeader: (index: number) => void;
  focusPrevHeader: (index: number) => void;
  focusNextHeader: (index: number) => void;
  focusFirstHeader: () => void;
  focusLastHeader: () => void;
}

export interface AccordionHeaderProps extends AccordionProps, AccordionMethods {
  children: React.ReactNode;
  headerProps?: Props;
  buttonProps?: Props;
  index: number;
}

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  tagName?: ValidPanelTags;
  index: number;
  sections: Section[];
  getIsExpanded: (id: string) => boolean;
  //Not needed below
  headerLevel?: ValidHTMLHeaderLevels;
  renderSection?: RenderSection;
  renderHeader?: RenderHeader;
  renderPanel?: RenderPanel;
  headerProps?: Props;
  panelProps?: Props;
  headerElementType?: React.ElementType | string; //eslint-disable-line @typescript-eslint/no-redundant-type-constituents
  panelElementType?: React.ElementType | string; //eslint-disable-line @typescript-eslint/no-redundant-type-constituents
  allowMultiple?: boolean;
  allowToggle?: boolean;
  getAllowToggle?: (id: string) => boolean;
  getIsDisabled?: (id: string) => boolean;
  toggleSection?: (id: string) => void;
  pushHeaderRef?: (ref: HeaderRef) => void;
  focusHeader?: (index: number) => void;
  focusPrevHeader?: (index: number) => void;
  focusNextHeader?: (index: number) => void;
  focusFirstHeader?: () => void;
  focusLastHeader?: () => void;
}

export interface BaseAccordionHeaderProps {
  children: React.ReactNode;
  id?: string | undefined;
  controlsId: string;
  headerLevel: ValidHTMLHeaderLevels;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  isExpanded?: boolean;
  isDisabled?: boolean;
  headerProps?: Props;
  buttonProps?: Props;
}

export interface BaseAccordionPanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
  labelId?: string;
  tagName?: ValidPanelTags;
  className?: string;
}
