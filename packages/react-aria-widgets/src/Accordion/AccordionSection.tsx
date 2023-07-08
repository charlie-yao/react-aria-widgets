import React from 'react';
import PropTypes from 'prop-types';

//Contexts
import AccordionSectionContext from 'src/Accordion/AccordionSectionContext';

//Types
import type { AccordionSectionProps } from 'src/Accordion/types';

function AccordionSection({
  children = null,
  id,
}: AccordionSectionProps) {
  return (
    <AccordionSectionContext.Provider value={ id }>
      { children }
    </AccordionSectionContext.Provider>
  );
}

AccordionSection.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
};

export default AccordionSection;
