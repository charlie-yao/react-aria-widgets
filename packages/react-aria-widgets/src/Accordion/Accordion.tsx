import React from 'react';
import PropTypes from 'prop-types';

//Components
import ControlledAccordion from 'src/Accordion/ControlledAccordion';

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
  const accordionContextValue = useAccordion({
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    onStateChange,
    onFocusChange,
  });

  return (
    <ControlledAccordion contextValue={ accordionContextValue }>
      { children }
    </ControlledAccordion>
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
