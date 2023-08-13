import { createContext } from 'react';

//Types
import type { ValidHTMLHeaderLevels } from '../../types';
import type {
  GetIsExpanded,
  GetIsDisabled,
  ToggleExpanded,
  ToggleDisabled,
  PushItemRef,
  FocusItemIndex,
  FocusItemId,
  FocusPrevItem,
  FocusNextItem,
  FocusFirstItem,
  FocusLastItem,
} from '../hooks/useAccordion';

export interface AccordionContextType {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  getIsExpanded: GetIsExpanded;
  getIsDisabled: GetIsDisabled;
  toggleExpanded: ToggleExpanded;
  toggleDisabled: ToggleDisabled;
  pushItemRef: PushItemRef;
  focusItemIndex: FocusItemIndex;
  focusItemId: FocusItemId;
  focusPrevItem: FocusPrevItem;
  focusNextItem: FocusNextItem;
  focusFirstItem: FocusFirstItem;
  focusLastItem: FocusLastItem;
}

const AccordionContext = createContext<AccordionContextType | null>(null);
const AccordionProvider = AccordionContext.Provider;

export default AccordionContext;
export { AccordionProvider };
