import { useContext } from 'react';

//Contexts
import AccordionContext from 'src/Accordion/AccordionContext';

export default function useAccordionContext() {
  const accordionContext = useContext(AccordionContext);
  
  if(!accordionContext)
    throw new Error('useAccordionContext received a falsy value when trying to consume an AccordionContext');

  return accordionContext;
}
