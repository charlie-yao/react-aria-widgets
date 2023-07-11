import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

//Contexts
import AccordionContext from 'src/Accordion/AccordionContext';

//Hooks
import useAccordion from 'src/Accordion/useAccordion';

//Types
import type { AccordionProps } from 'src/Accordion/types';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

function Accordion({
  children = null,
  allowMultiple = true,
  allowToggle = true,
  headerLevel,
}: AccordionProps) {
  const accordionProperties = useAccordion(allowMultiple, allowToggle);
  const accordionContextValue = useMemo(() => {
    return {
      headerLevel,
      ...accordionProperties,
    };
  }, [
    headerLevel,
    accordionProperties,
  ]);

  return (
    <AccordionContext.Provider value={ accordionContextValue }>
      { children }
    </AccordionContext.Provider>
  );
}

Accordion.propTypes = {
  children: PropTypes.node,
  allowMultiple: PropTypes.bool,
  allowToggle: PropTypes.bool,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
};

export default Accordion;
