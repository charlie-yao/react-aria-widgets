import { createContext } from 'react';

//Types
import type { AccordionContextType } from 'src/Accordion/types';

const AccordionContext = createContext<AccordionContextType | null>(null);

export default AccordionContext;
