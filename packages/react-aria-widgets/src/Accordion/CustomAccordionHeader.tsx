import React from 'react';

//Components
import AccordionHeader from 'src/Accordion/AccordionHeader';

//Types
import { AccordionHeaderProps } from 'src/Accordion/types';

export default function CustomAccordionHeader(props: AccordionHeaderProps) {
  return (
    <AccordionHeader
      buttonProps={{ style: { color: 'blue' } }} 
      {...props}
    />
  );
}
