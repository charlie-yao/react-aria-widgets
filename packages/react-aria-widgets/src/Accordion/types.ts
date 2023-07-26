import type React from 'react';

//Types
import type {
  ValidHTMLHeaderLevels,
  PolymorphicComponentPropsWithRef,
  PolymorphicForwardRefComponent,
  AsProp,
} from 'src/utils/types';

//Misc.
import type { VALID_PANEL_ELEMENTS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

export type ExpandedSections = Set<string>;

export type HeaderRef = HTMLButtonElement | HTMLElement | null;

export type ValidPanelElements = typeof VALID_PANEL_ELEMENTS[number];

export type GetIsExpanded = (id: string) => boolean;
export type GetIsDisabled = (id: string) => boolean;
export type ToggleSection = (id: string) => void;
export type PushHeaderRef = (ref: HeaderRef) => void;
export type FocusHeader = (index: number) => void;
export type FocusPrevHeader = (event: React.KeyboardEvent<HTMLButtonElement | HTMLElement>) => void;
export type FocusNextHeader = (event: React.KeyboardEvent<HTMLButtonElement | HTMLElement>) => void;
export type FocusFirstHeader = () => void;
export type FocusLastHeader = () => void;
export type OnStateChange = (expandedSections: ExpandedSections) => void;
export type OnFocusChange = (ref: HeaderRef, index: number) => void;
export type HandleClick = React.MouseEventHandler<HTMLElement>;
export type HandleKeyDown = React.KeyboardEventHandler<HTMLElement>;

export interface UseAccordion {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  onStateChange?: OnStateChange | undefined;
  onFocusChange?: OnFocusChange | undefined;
}

export interface AccordionContextType {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  getIsExpanded: GetIsExpanded;
  getIsDisabled: GetIsDisabled;
  toggleSection: ToggleSection;
  pushHeaderRef: PushHeaderRef;
  focusHeader: FocusHeader;
  focusPrevHeader: FocusPrevHeader;
  focusNextHeader: FocusNextHeader;
  focusFirstHeader: FocusFirstHeader;
  focusLastHeader: FocusLastHeader;
  handleClick: HandleClick;
  handleKeyDown: HandleKeyDown;
}

export type AccordionSectionContextType = string;

export type AccordionHeaderHeader = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'children' | 'dangerouslySetInnerHTML'
>;

export type AccordionHeaderButton = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' |
  'dangerouslySetInnerHTML' |
  'type' |
  'id' |
  'aria-controls' |
  'onClick' |
  'onKeyDown' |
  'aria-expanded' |
  'aria-disabled'
>;

export type AccordionProps = React.PropsWithChildren<{
  allowMultiple?: boolean;
  allowCollapseLast?: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  onStateChange?: OnStateChange;
  onFocusChange?: OnFocusChange;
}>;

export type ControlledAccordionProps = React.PropsWithChildren<{
  contextValue: AccordionContextType;
}>;

export type AccordionSectionProps = React.PropsWithChildren<{
  id?: string;
}>;

export type AccordionHeaderProps = React.PropsWithChildren<{
  headerProps?: AccordionHeaderHeader;
  buttonProps?: AccordionHeaderButton;
}>;

export type AccordionPanelProps<C extends ValidPanelElements = typeof DEFAULT_PANEL_ELEMENT> =
  AsProp<C, ValidPanelElements> &
  React.ComponentPropsWithoutRef<C>;

export type BaseAccordionHeaderProps = React.PropsWithChildren<{
  id?: string | undefined;
  controlsId: string;
  headerLevel: ValidHTMLHeaderLevels;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  isExpanded: boolean;
  isDisabled: boolean;
  headerProps?: AccordionHeaderHeader;
  buttonProps?: AccordionHeaderButton;
}>;

export interface InternalBaseAccordionPanelProps {
  id: string;
  labelId?: string;
}

export type BaseAccordionPanelProps<C extends React.ElementType = typeof DEFAULT_PANEL_ELEMENT> = PolymorphicComponentPropsWithRef<
  C,
  InternalBaseAccordionPanelProps,
  ValidPanelElements
>;

export type TForwardedBaseAccordionPanel = PolymorphicForwardRefComponent<
  InternalBaseAccordionPanelProps,
  ValidPanelElements,
  typeof DEFAULT_PANEL_ELEMENT
>;
