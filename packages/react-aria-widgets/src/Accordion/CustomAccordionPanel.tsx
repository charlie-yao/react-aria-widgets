import React from 'react';

//Components
import AccordionPanel from 'src/Accordion/AccordionPanel';

//Types
import { AccordionPanelProps } from 'src/Accordion/types';

export default function CustomAccordionPanel(props: AccordionPanelProps) {
  const { style = {}, ...rest } = props;
  const _style = Object.assign({}, style, {
    color: 'blue',
  });

  return (
    <AccordionPanel
      style={ _style }
      { ...rest }
    />
  );
}
