import { createContext } from 'react';

export interface AccordionItemContextType {
  id: string;
  headerHTMLId: string;
  panelHTMLId: string;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);
const AccordionItemProvider = AccordionItemContext.Provider;

export default AccordionItemContext;
export { AccordionItemProvider };
