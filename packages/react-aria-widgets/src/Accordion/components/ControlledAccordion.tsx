import React from 'react';
import PropTypes from 'prop-types';

//Contexts
import { AccordionProvider } from '../contexts/AccordionContext';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from '../../utils';

//Types
import type { AccordionContextType } from '../contexts/AccordionContext';

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
  pushItemRef: PropTypes.func.isRequired,
  focusItemIndex: PropTypes.func.isRequired,
  focusItemId: PropTypes.func.isRequired,
  focusPrevItem: PropTypes.func.isRequired,
  focusNextItem: PropTypes.func.isRequired,
  focusFirstItem: PropTypes.func.isRequired,
  focusLastItem: PropTypes.func.isRequired,
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
