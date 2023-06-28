/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

//Components
import AccordionHeader from 'src/Accordion/AccordionHeader';

//Types
import type { AccordionHeaderProps } from 'src/Accordion/types';

export default function BlueAccordionHeader(props: AccordionHeaderProps) {
  const { buttonProps = { style: {} }, ...rest } = props;
  const _buttonProps = {
    ...buttonProps,
    style: {
      ...buttonProps.style,
      color: 'blue',
    },
  };

  return (
    <AccordionHeader
      buttonProps={ _buttonProps }
      { ...rest }
    />
  );
}
