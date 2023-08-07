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

export type ExpandedItems = Set<string>;
export type DisabledItems = Set<string>;

export type HeaderElement = HTMLButtonElement | HTMLElement | null;

export type ValidPanelElements = typeof VALID_PANEL_ELEMENTS[number];

export interface HeaderRef {
  elem: HeaderElement;
  id: string;
}

export type AccordionRenderFunction = (args: AccordionContextType & AccordionItemContextType) => React.ReactElement;

export interface AccordionRenderData {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  isExpanded: boolean;
  isDisabled: boolean;
}

export type HeaderProps = {
  className?: string | ((args: AccordionRenderData) => string);
  style?: React.CSSProperties | ((args: AccordionRenderData) => React.CSSProperties);
} & Omit<BaseHeaderProps, 'className' | 'style'>;

export type BaseHeaderProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'children' | 'dangerouslySetInnerHTML'
>;

export type ButtonProps = {
  className?: string | ((args: AccordionRenderData) => string);
  style?: React.CSSProperties | ((args: AccordionRenderData) => React.CSSProperties);
} & Omit<BaseButtonProps, 'className' | 'style'>;

export type BaseButtonProps = Omit<
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

export type GetIsExpanded = (id: string) => boolean;
export type GetIsDisabled = (id: string) => boolean;
export type ToggleExpanded = (id: string) => void;
export type ToggleDisabled = (id: string) => void;
export type PushHeaderRef = (elem: HeaderElement, id: string) => void;
export type FocusHeaderIndex = (index: number) => void;
export type FocusHeaderId = (id: string) => void;
export type FocusPrevHeader = (id: string) => void;
export type FocusNextHeader = (id: string) => void;
export type FocusFirstHeader = () => void;
export type FocusLastHeader = () => void;
export type OnToggleExpanded = (expandedItems: ExpandedItems) => void;
export type OnToggleDisabled = (disabledItems: DisabledItems) => void;
export type OnFocusChange = ({ elem, index, id }: { elem: HeaderElement; index: number; id: string }) => void;

export interface UseAccordion {
  allowMultiple?: boolean;
  allowCollapseLast?: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  initialExpanded?: string[];
  initialDisabled?: string[];
  onToggleExpanded?: OnToggleExpanded | undefined;
  onToggleDisabled?: OnToggleDisabled | undefined;
  onFocusChange?: OnFocusChange | undefined;
}

export interface AccordionContextType {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  getIsExpanded: GetIsExpanded;
  getIsDisabled: GetIsDisabled;
  toggleExpanded: ToggleExpanded;
  toggleDisabled: ToggleDisabled;
  pushHeaderRef: PushHeaderRef;
  focusHeaderIndex: FocusHeaderIndex;
  focusHeaderId: FocusHeaderId;
  focusPrevHeader: FocusPrevHeader;
  focusNextHeader: FocusNextHeader;
  focusFirstHeader: FocusFirstHeader;
  focusLastHeader: FocusLastHeader;
}

export interface AccordionItemContextType {
  id: string;
  headerHTMLId: string;
  panelHTMLId: string;
}

export type AccordionProps = React.PropsWithChildren<{
  allowMultiple?: boolean;
  allowCollapseLast?: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  initialExpanded?: string[];
  initialDisabled?: string[];
  onToggleExpanded?: OnToggleExpanded;
  onToggleDisabled?: OnToggleDisabled;
  onFocusChange?: OnFocusChange;
}>;

export type ControlledAccordionProps = React.PropsWithChildren<{
  contextValue: AccordionContextType;
}>;

export type AccordionItemProps = React.PropsWithChildren<{
  id: string;
}>;

export interface AccordionHeaderProps {
  children?: React.ReactNode | AccordionRenderFunction;
  headerProps?: HeaderProps;
  buttonProps?: ButtonProps;
}

export interface InternalAccordionPanelProps {
  children?: React.ReactNode | AccordionRenderFunction;
  className?: string | ((args: AccordionRenderData) => string);
  style?: React.CSSProperties | ((args: AccordionRenderData) => React.CSSProperties);
}

export type AccordionPanelProps<C extends ValidPanelElements = typeof DEFAULT_PANEL_ELEMENT> = PolymorphicComponentPropsWithoutRef<
  C,
  InternalAccordionPanelProps,
  ValidPanelElements
>;

export type BaseAccordionHeaderProps = React.PropsWithChildren<{
  id?: string | undefined;
  headerLevel: ValidHTMLHeaderLevels;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  'aria-controls': string;
  'aria-expanded': boolean;
  'aria-disabled': boolean;
  headerProps?: BaseHeaderProps;
  buttonProps?: BaseButtonProps;
}>;

export interface InternalBaseAccordionPanelProps {
  id: string;
  'aria-labelledby'?: string;
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
