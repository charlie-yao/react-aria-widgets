import { createContext } from 'react';

//Types
import type { AccordionSectionContextType } from 'src/Accordion/types';

const AccordionSectionContext = createContext<AccordionSectionContextType | null>(null);
const AccordionSectionProvider = AccordionSectionContext.Provider;

export default AccordionSectionContext;
export { AccordionSectionProvider };
