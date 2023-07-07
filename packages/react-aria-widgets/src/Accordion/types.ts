import type React from 'react';

//Types
import type {
  ValidHTMLHeaderLevels,
  PolymorphicComponentPropsWithoutRef,
  PolymorphicComponentPropsWithRef,
  PolymorphicForwardRefComponent,
} from 'src/utils/types';

//Misc.
import type { VALID_PANEL_ELEMENTS, DEFAULT_PANEL_ELEMENT } from 'src/Accordion/utils';

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

export interface AccordionContextType {
  allowMultiple: boolean;
  allowToggle: boolean;
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
}

export type AccordionSectionContextType = string;

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
  allowToggle?: boolean;
  headerLevel: ValidHTMLHeaderLevels;
}>;

export type AccordionSectionProps = React.PropsWithChildren<{
  id: string;
}>;

export type AccordionHeaderProps = React.PropsWithChildren<{
  headerProps?: AccordionHeaderHeader;
  buttonProps?: AccordionHeaderButton;
}>;

export type AccordionPanelProps<C extends ValidPanelElements = typeof DEFAULT_PANEL_ELEMENT> = PolymorphicComponentPropsWithoutRef<
  C,
  {},
  ValidPanelElements
>;

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
