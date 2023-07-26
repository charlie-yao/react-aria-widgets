import React from 'react';

//Contexts
import { AccordionProvider } from 'src/Accordion/AccordionContext';

//Types
import type { ControlledAccordionProps } from 'src/Accordion/types';

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
