import { useContext } from 'react';

//Contexts
import AccordionSectionContext from 'src/Accordion/AccordionSectionContext';

export default function useAccordionSectionContext() {
  const id = useContext(AccordionSectionContext);

  if(!id)
    throw new Error('useAccordionSectionContext received a falsy value when trying to consume an AccordionSectionContext');

  return id;
}
