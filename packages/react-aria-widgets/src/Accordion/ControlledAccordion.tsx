import React from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionProvider } from './AccordionContext';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from '../utils';

//Types
import type { AccordionContextType } from './AccordionContext';

export type ControlledAccordionProps = React.PropsWithChildren<{
  contextValue: AccordionContextType;
}>;

export const accordionContextValuePropType = PropTypes.exact({
  allowMultiple: PropTypes.bool.isRequired,
  allowCollapseLast: PropTypes.bool.isRequired,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  getIsExpanded: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  toggleDisabled: PropTypes.func.isRequired,
  pushHeaderRef: PropTypes.func.isRequired,
  focusHeaderIndex: PropTypes.func.isRequired,
  focusHeaderId: PropTypes.func.isRequired,
  focusPrevHeader: PropTypes.func.isRequired,
  focusNextHeader: PropTypes.func.isRequired,
  focusFirstHeader: PropTypes.func.isRequired,
  focusLastHeader: PropTypes.func.isRequired,
});

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
