import React from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionProvider } from 'src/Accordion/AccordionContext';

//Types
import type { AccordionContextType } from 'src/Accordion/AccordionContext';
import { accordionContextValuePropType } from 'src/Accordion/propTypes';

export type ControlledAccordionProps = React.PropsWithChildren<{
  contextValue: AccordionContextType;
}>;

function ControlledAccordion({
  children = null,
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
