import React from 'react'
import PropTypes from 'prop-types';

//Contexts
import AccordionSectionContext from 'src/Accordion/AccordionSectionContext';

//Types
import { AccordionSectionProps } from 'src/Accordion/types';

function AccordionSection({ children, id }: AccordionSectionProps) {
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
