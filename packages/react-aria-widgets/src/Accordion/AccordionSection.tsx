import React, { useId, useMemo } from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionSectionProvider } from 'src/Accordion/AccordionSectionContext';

//Types
import type { AccordionSectionProps } from 'src/Accordion/types';

function AccordionSection({
  children = null,
  id,
}: AccordionSectionProps) {
  const reactId = useId();
  const headerHTMLId = `${reactId}-react-aria-widgets-accordion-header-${id}`;
  const panelHTMLId = `${reactId}-react-aria-widgets-accordion-panel-${id}`;

  const contextValue = useMemo(() => {
    return {
      id,
      headerHTMLId,
      panelHTMLId,
    };
  }, [ id, reactId ]);

  return (
    <AccordionSectionProvider value={ contextValue }>
      { children }
    </AccordionSectionProvider>
  );
}

AccordionSection.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
};

export default AccordionSection;
