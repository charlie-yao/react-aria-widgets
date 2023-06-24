import type React from 'react';

//Types
import type { Props, ValidHTMLHeaderLevels, PolymorphicComponentPropsWithoutRef } from 'src/utils/types';

//Misc.
import type { VALID_PANEL_TAGS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

export type HeaderRef = HTMLButtonElement | HTMLElement | null;
export type ValidPanelTags = typeof VALID_PANEL_TAGS[number];

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

export type RenderSection = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;
export type RenderHeader = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;
export type RenderPanel = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;
export type RenderHeaderContent = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;
export type RenderPanelContent = (index: number, props: AccordionProps, accordionMethods: AccordionMethods) => React.ReactNode;

export type GetIsExpanded = (id: string) => boolean;
export type GetIsDisabled = (id: string) => boolean;
export type ToggleSection = (id: string) => void;
export type PushHeaderRef = (ref: HeaderRef) => void;
export type FocusHeader = (index: number) => void;
export type FocusPrevHeader = (index: number) => void;
export type FocusNextHeader = (index: number) => void;
export type FocusFirstHeader = () => void;
export type FocusLastHeader = () => void;

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
  getIsExpanded: GetIsExpanded;
  getIsDisabled: GetIsDisabled;
  toggleSection: ToggleSection;
  pushHeaderRef: PushHeaderRef;
  focusHeader: FocusHeader;
  focusPrevHeader: FocusPrevHeader;
  focusNextHeader: FocusNextHeader;
  focusFirstHeader: FocusFirstHeader;
  focusLastHeader: FocusLastHeader;
}

export interface AccordionHeaderProps extends
  Pick<AccordionProps, 'sections' | 'headerLevel'>,
  Omit<AccordionMethods, 'focusHeader'> {
  children: React.ReactNode;
  headerProps?: Props;
  buttonProps?: Props;
  index: number;
}

export type _AccordionPanelProps<C extends ValidPanelTags = typeof DEFAULT_PANEL_ELEMENT> =
  Pick<AccordionProps, 'sections'> &
  Pick<AccordionMethods, 'getIsExpanded'> &
  {
    index: number;
    as?: C;
    //Not needed below
    allowMultiple?: boolean;
    allowToggle?: boolean;
    headerLevel?: ValidHTMLHeaderLevels;
    renderSection?: RenderSection;
    renderHeader?: RenderHeader;
    renderPanel?: RenderPanel;
    headerProps?: Props;
    panelProps?: Props;
    headerElementType?: HeaderElementType;
    panelElementType?: PanelElementType;
    getIsDisabled?: GetIsDisabled;
    toggleSection?: ToggleSection;
    pushHeaderRef?: PushHeaderRef;
    focusHeader?: FocusHeader;
    focusPrevHeader?: FocusPrevHeader;
    focusNextHeader?: FocusNextHeader;
    focusFirstHeader?: FocusFirstHeader;
    focusLastHeader?: FocusLastHeader;
  };

export type AccordionPanelProps<C extends ValidPanelTags = typeof DEFAULT_PANEL_ELEMENT> =
  _AccordionPanelProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof _AccordionPanelProps>;

/*
export type AccordionPanelProps<C extends React.ElementType = typeof DEFAULT_PANEL_ELEMENT> = PolymorphicComponentPropsWithoutRef<
//export type AccordionPanelProps<C extends React.ElementType> = PolymorphicComponentPropsWithoutRef<
//export type AccordionPanelProps<C extends ValidPanelTags = typeof DEFAULT_PANEL_ELEMENT> = PolymorphicComponentPropsWithoutRef<
  C,
  //Pick<AccordionProps, 'sections'> & Pick<AccordionMethods, 'getIsExpanded'> & {
  Pick<AccordionMethods, 'getIsExpanded'> &
  {
    sections: Section[];
    //sections: object[];
    index: number;
    //Not needed below
    allowMultiple?: boolean;
    allowToggle?: boolean;
    headerLevel?: ValidHTMLHeaderLevels;
    renderSection?: RenderSection;
    renderHeader?: RenderHeader;
    renderPanel?: RenderPanel;
    headerProps?: Props;
    panelProps?: Props;
    headerElementType?: HeaderElementType;
    panelElementType?: PanelElementType;
    getIsDisabled?: GetIsDisabled;
    toggleSection?: ToggleSection;
    pushHeaderRef?: PushHeaderRef;
    focusHeader?: FocusHeader;
    focusPrevHeader?: FocusPrevHeader;
    focusNextHeader?: FocusNextHeader;
    focusFirstHeader?: FocusFirstHeader;
    focusLastHeader?: FocusLastHeader;
  },
  ValidPanelTags
>
*/

/*
export interface AccordionPanelProps extends
  React.HTMLAttributes<HTMLElement>,
  Pick<AccordionProps, 'sections'>,
  Pick<AccordionMethods, 'getIsExpanded'>
{
  children: React.ReactNode;
  className?: string;
  as?: ValidPanelTags;
  index: number;
  //Not needed below
  allowMultiple?: boolean;
  allowToggle?: boolean;
  headerLevel?: ValidHTMLHeaderLevels;
  renderSection?: RenderSection;
  renderHeader?: RenderHeader;
  renderPanel?: RenderPanel;
  headerProps?: Props;
  panelProps?: Props;
  headerElementType?: HeaderElementType;
  panelElementType?: PanelElementType;
  getIsDisabled?: GetIsDisabled;
  toggleSection?: ToggleSection;
  pushHeaderRef?: PushHeaderRef;
  focusHeader?: FocusHeader;
  focusPrevHeader?: FocusPrevHeader;
  focusNextHeader?: FocusNextHeader;
  focusFirstHeader?: FocusFirstHeader;
  focusLastHeader?: FocusLastHeader;
}
*/

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

export interface BaseAccordionPanelProps {
  id: string;
  labelId?: string;
}
