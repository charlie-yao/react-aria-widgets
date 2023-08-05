import { createContext } from 'react';

//Types
import type { AccordionItemContextType } from 'src/Accordion/types';

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);
const AccordionItemProvider = AccordionItemContext.Provider;

export default AccordionItemContext;
export { AccordionItemProvider };
