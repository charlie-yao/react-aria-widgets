import { useContext } from 'react';

//Contexts
import AccordionItemContext from '../contexts/AccordionItemContext';

export default function useAccordionItemContext() {
  const ids = useContext(AccordionItemContext);

  if(!ids)
    throw new Error('useAccordionItemContext received a falsy value when trying to consume an AccordionItemContext');

  return ids;
}
