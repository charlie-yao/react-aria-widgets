import React, { useId, useMemo } from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionItemProvider } from './AccordionItemContext';

export type AccordionItemProps = React.PropsWithChildren<{
  id: string;
}>;

function AccordionItem({
  children = null,
  id,
}: AccordionItemProps) {
  const reactId = useId();
  const headerHTMLId = `${reactId}-react-aria-widgets-accordion-header-${id}`;
  const panelHTMLId = `${reactId}-react-aria-widgets-accordion-panel-${id}`;

  const contextValue = useMemo(() => {
    return {
      id,
      headerHTMLId,
      panelHTMLId,
    };
  }, [
    id,
    headerHTMLId,
    panelHTMLId,
  ]);

  return (
    <AccordionItemProvider value={ contextValue }>
      { children }
    </AccordionItemProvider>
  );
}

AccordionItem.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
};

export default AccordionItem;
