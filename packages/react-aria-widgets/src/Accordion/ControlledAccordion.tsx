import React from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionProvider } from 'src/Accordion/AccordionContext';

//Types
import type { ControlledAccordionProps } from 'src/Accordion/types';
import { accordionContextValuePropType } from 'src/Accordion/propTypes';

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

ControlledAccordion.propTypes = {
  children: PropTypes.node,
  contextValue: accordionContextValuePropType.isRequired,
};

export default ControlledAccordion;
