/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type { BaseAccordionHeaderProps } from 'src/Accordion/types';

//Misc
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

const BaseAccordionHeader = React.forwardRef<HTMLButtonElement, BaseAccordionHeaderProps>(({
  children,
  id,
  headerLevel,
  onClick,
  onKeyDown,
  'aria-controls': ariaControls,
  'aria-expanded': ariaExpanded,
  'aria-disabled': ariaDisabled,
  headerProps,
  buttonProps,
}, ref) => {
  const HeaderElement: React.ElementType = `h${headerLevel}`;

  return (
    <HeaderElement { ...headerProps }>
      <button
        { ...buttonProps }
        type="button"
        id={ id }
        onClick={ onClick }
        onKeyDown={ onKeyDown }
        aria-controls={ ariaControls }
        aria-expanded={ ariaExpanded }
        aria-disabled={ ariaDisabled }
        ref={ ref }
      >
        { children }
      </button>
    </HeaderElement>
  );
});

BaseAccordionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  'aria-controls': PropTypes.string.isRequired,
  'aria-expanded': PropTypes.bool.isRequired,
  'aria-disabled': PropTypes.bool.isRequired,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

BaseAccordionHeader.defaultProps = {
  id: undefined,
  onKeyDown: undefined,
  headerProps: {},
  buttonProps: {},
};

BaseAccordionHeader.displayName = 'BaseAccordionHeader';

export default BaseAccordionHeader;
