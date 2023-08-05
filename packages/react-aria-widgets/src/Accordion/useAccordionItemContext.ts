import { useContext } from 'react';

//Contexts
import AccordionItemContext from 'src/Accordion/AccordionItemContext';

export default function useAccordionItemContext() {
  const id = useContext(AccordionItemContext);

  if(!id)
    throw new Error('useAccordionItemContext received a falsy value when trying to consume an AccordionItemContext');

  return id;
}
