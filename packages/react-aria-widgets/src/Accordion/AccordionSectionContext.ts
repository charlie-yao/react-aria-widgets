import { createContext } from 'react';

//Types
import type { AccordionSectionContextType } from 'src/Accordion/types';

const AccordionSectionContext = createContext<AccordionSectionContextType | null>(null);

export default AccordionSectionContext;
