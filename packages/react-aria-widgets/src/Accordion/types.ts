import type React from 'react';

//Types
import type { ValidHTMLHeaderLevels } from '../types';
import type { AccordionContextType } from './contexts/AccordionContext';
import type { AccordionItemContextType } from './contexts/AccordionItemContext';

//Misc.
import type { VALID_PANEL_ELEMENTS } from './utils';

export type ValidPanelElements = typeof VALID_PANEL_ELEMENTS[number];

export interface AccordionRenderStyleData {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  isExpanded: boolean;
  isDisabled: boolean;
}

export type AccordionRenderFunction = (args: AccordionContextType & AccordionItemContextType) => React.ReactNode;
export type AccordionRenderClass = (args: AccordionRenderStyleData) => string;
export type AccordionRenderStyle = (args: AccordionRenderStyleData) => React.CSSProperties;
