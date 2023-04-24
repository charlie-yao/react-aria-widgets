import React from 'react';

//Components
import AccordionHeader from 'src/Accordion/AccordionHeader';

//Types
import { AccordionHeaderProps } from 'src/Accordion/types';

export default function GreenAccordionHeader(props: AccordionHeaderProps) {
  const { buttonProps = { style: {} }, ...rest } = props;
  const _buttonProps = {
    ...buttonProps,
    style: {
      ...buttonProps.style,
      color: 'green',
    },
  };

  return (
    <AccordionHeader
      buttonProps={ _buttonProps }
      { ...rest }
    />
  );
}
