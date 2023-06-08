import type React from 'react';

//Types
import type { Props, ValidHTMLHeaderLevels } from 'src/utils/types';

//Misc.
import type { VALID_PANEL_TAGS } from 'src/Accordion/utils';

export type HeaderRef = HTMLButtonElement | HTMLElement | null;

/* eslint-disable @typescript-eslint/no-redundant-type-constituents --
 * These types would ideally be limited to React.ElementType, but we're also
 * supporting PropTypes. We're using PropTypes.elementType on the PropTypes
 * side, which allows all strings. If we limit it to just React.ElementType
 * on the TypeScript side, there are times where the compiler will complain
 * due to a mismatch between the type definitions from TS and PropTypes
 * (PropTypes.elementType allows passing in strings outside the set defined
 * by React.ElementType).
 */
export type HeaderElementType = React.ElementType | string;
export type PanelElementType = React.ElementType | string;
/* eslint-enable @typescript-eslint/no-redundant-type-constituents */

export interface Section {
  id: string;
  renderHeaderContent: React.ReactNode | RenderHeaderContent;
  renderPanelContent: React.ReactNode | RenderPanelContent;
  renderHeader?: RenderHeader | null | undefined;
  renderPanel?: RenderPanel | null | undefined;
  headerProps?: Props | null | undefined;
  panelProps?: Props | null | undefined;
  headerElementType?: HeaderElementType | null | undefined;
  panelElementType?: PanelElementType | null | undefined;
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
  headerElementType: HeaderElementType;
  panelElementType: PanelElementType;
}

export interface AccordionMethods {
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

export interface AccordionHeaderProps extends
  Pick<AccordionProps, 'sections' | 'headerLevel'>,
  Omit<AccordionMethods, 'focusHeader'> {
  children: React.ReactNode;
  headerProps?: Props;
  buttonProps?: Props;
  index: number;
}

export interface AccordionPanelProps extends
  React.HTMLAttributes<HTMLElement>,
  Pick<AccordionProps, 'sections'>,
  Pick<AccordionMethods, 'getIsExpanded'> {
  children: React.ReactNode;
  className?: string;
  tagName?: ValidPanelTags;
  index: number;
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
