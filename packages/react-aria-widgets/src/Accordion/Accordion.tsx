import React from 'react';
import PropTypes from 'prop-types';

//Components
import ControlledAccordion from 'src/Accordion/ControlledAccordion';

//Hooks
import useAccordion from 'src/Accordion/useAccordion';

//Types
import type { ValidHTMLHeaderLevels } from 'src/utils/types';
import type { OnToggleExpanded, OnToggleDisabled, OnFocusChange } from 'src/Accordion/useAccordion';

//Misc.
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

export type AccordionProps = React.PropsWithChildren<{
  allowMultiple?: boolean;
  allowCollapseLast?: boolean;
  headerLevel: ValidHTMLHeaderLevels;
  initialExpanded?: string[];
  initialDisabled?: string[];
  onToggleExpanded?: OnToggleExpanded;
  onToggleDisabled?: OnToggleDisabled;
  onFocusChange?: OnFocusChange;
}>;

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
