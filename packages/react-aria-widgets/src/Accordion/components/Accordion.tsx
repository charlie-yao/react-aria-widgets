import React from 'react';
import PropTypes from 'prop-types';

//Components
import ControlledAccordion from './ControlledAccordion';

//Hooks
import useAccordion from '../hooks/useAccordion';

//Types
import type { UseAccordion } from '../hooks/useAccordion';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from '../../utils';

export type AccordionProps = React.PropsWithChildren<UseAccordion>;

function Accordion({
  children = null,
  allowMultiple = true,
  allowCollapseLast = true,
  headerLevel,
  initialExpanded = [],
  initialDisabled = [],
  onToggleExpanded = undefined,
  onToggleDisabled = undefined,
  onFocusChange = undefined,
}: AccordionProps) {
  const accordionContextValue = useAccordion({
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    initialExpanded,
    initialDisabled,
    onToggleExpanded,
    onToggleDisabled,
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
  initialExpanded: PropTypes.arrayOf(PropTypes.string.isRequired),
  initialDisabled: PropTypes.arrayOf(PropTypes.string.isRequired),
  onToggleExpanded: PropTypes.func,
  onToggleDisabled: PropTypes.func,
  onFocusChange: PropTypes.func,
};

export default Accordion;
