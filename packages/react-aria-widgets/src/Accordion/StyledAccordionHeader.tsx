import React from 'react';

//Components
import AccordionHeader from 'src/Accordion/AccordionHeader';

//Types
import { AccordionHeaderProps } from 'src/Accordion/types';

export default function CustomAccordionHeader(props: AccordionHeaderProps) {
  let { buttonProps = {}, ...rest } = props;
  
  if('style' in buttonProps) {
    buttonProps.style = Object.assign({}, buttonProps.style, {
      color: 'blue',
    });
  }

  return (
    <AccordionHeader
      buttonProps={ buttonProps }
      { ...rest }
    />
  );
}
