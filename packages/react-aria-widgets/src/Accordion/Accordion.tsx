import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionProvider } from 'src/Accordion/AccordionContext';

//Hooks
import useAccordion from 'src/Accordion/useAccordion';

//Types
import type { AccordionProps } from 'src/Accordion/types';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

function Accordion({
  children = null,
  allowMultiple = true,
  allowCollapseLast = true,
  headerLevel,
  onStateChange = undefined,
  onFocusChange = undefined,
}: AccordionProps) {
  const accordionProperties = useAccordion({
    allowMultiple,
    allowCollapseLast,
    onStateChange,
    onFocusChange,
  });

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
    <AccordionProvider value={ accordionContextValue }>
      { children }
    </AccordionProvider>
  );
}

Accordion.propTypes = {
  children: PropTypes.node,
  allowMultiple: PropTypes.bool,
  allowCollapseLast: PropTypes.bool,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  onStateChange: PropTypes.func,
  onFocusChange: PropTypes.func,
};

export default Accordion;
