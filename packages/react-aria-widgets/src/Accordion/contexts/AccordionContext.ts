import { createContext } from 'react';

//Types
import type { AccordionMembers } from '../hooks/useAccordion';

const AccordionContext = createContext<AccordionMembers | null>(null);
const AccordionProvider = AccordionContext.Provider;

export default AccordionContext;
export { AccordionProvider };
