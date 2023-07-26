import React from 'react';

//Contexts
import { AccordionProvider } from 'src/Accordion/AccordionContext';

//Types
import { ControlledAccordionProps } from 'src/Accordion/types';

function ControlledAccordion({
  children,
  contextValue,
}: ControlledAccordionProps) {
  return (
    <AccordionProvider value={ contextValue }>
      { children }
    </AccordionProvider>
  );
}

export default ControlledAccordion;
