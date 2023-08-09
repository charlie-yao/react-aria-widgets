import type React from 'react';

//Types
import type { ValidHTMLHeaderLevels } from 'src/utils/types';
import type { AccordionContextType } from 'src/Accordion/AccordionContext';
import type { AccordionItemContextType } from 'src/Accordion/AccordionItemContext';

//Misc.
import type { VALID_PANEL_ELEMENTS } from 'src/Accordion/utils';

export type ValidPanelElements = typeof VALID_PANEL_ELEMENTS[number];

export interface AccordionRenderStyleData {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  isExpanded: boolean;
  isDisabled: boolean;
}

export type AccordionRenderFunction = (args: AccordionContextType & AccordionItemContextType) => React.ReactElement;
export type AccordionRenderClass = (args: AccordionRenderStyleData) => string;
export type AccordionRenderStyle = (args: AccordionRenderStyleData) => React.CSSProperties;
