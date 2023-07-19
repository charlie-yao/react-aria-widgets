import React, { useId } from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionSectionProvider } from 'src/Accordion/AccordionSectionContext';

//Types
import type { AccordionSectionProps } from 'src/Accordion/types';

function AccordionSection({
  children = null,
  id: idProp = undefined,
}: AccordionSectionProps) {
  const reactGeneratedId = useId();
  const id = idProp ? idProp : reactGeneratedId;

  return (
    <AccordionSectionProvider value={ id }>
      { children }
    </AccordionSectionProvider>
  );
}

AccordionSection.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export default AccordionSection;
