import React from 'react';

//Components
import AccordionPanel from 'src/Accordion/AccordionPanel';

//Types
import { AccordionPanelProps } from 'src/Accordion/types';

export default function CustomAccordionPanel(props: AccordionPanelProps) {
  return (
    <AccordionPanel
      style={{ color: 'blue' }}
      {...props}
    />
  );
}
