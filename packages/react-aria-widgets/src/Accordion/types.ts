import type React from 'react';

//Types
import type { ValidHTMLHeaderLevels } from '../types';
import type { AccordionMembers } from './hooks/useAccordion';
import type { AccordionItemContextType } from './contexts/AccordionItemContext';

export interface AccordionRenderStyleData {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  isExpanded: boolean;
  isDisabled: boolean;
}

export type AccordionRenderFunction = (args: AccordionMembers & AccordionItemContextType) => React.ReactNode;
export type AccordionRenderClass = (args: AccordionRenderStyleData) => string;
export type AccordionRenderStyle = (args: AccordionRenderStyleData) => React.CSSProperties;
