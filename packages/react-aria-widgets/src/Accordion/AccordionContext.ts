import { createContext } from 'react';

//Types
import type { ValidHTMLHeaderLevels } from '../utils/types';
import type {
  GetIsExpanded,
  GetIsDisabled,
  ToggleExpanded,
  ToggleDisabled,
  PushHeaderRef,
  FocusHeaderIndex,
  FocusHeaderId,
  FocusPrevHeader,
  FocusNextHeader,
  FocusFirstHeader,
  FocusLastHeader,
} from './useAccordion';

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

const AccordionContext = createContext<AccordionContextType | null>(null);
const AccordionProvider = AccordionContext.Provider;

export default AccordionContext;
export { AccordionProvider };
