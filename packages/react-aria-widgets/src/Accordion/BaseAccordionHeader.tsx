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
  controlsId,
  headerLevel,
  onClick,
  onKeyDown,
  isExpanded,
  isDisabled,
  headerProps,
  buttonProps,
}, ref) => {
  const HeaderElement: React.ElementType = `h${headerLevel}`;

  return (
    <HeaderElement { ...headerProps }>
      <button
        type="button"
        id={ id }
        aria-controls={ controlsId }
        onClick={ onClick }
        onKeyDown={ onKeyDown }
        aria-expanded={ isExpanded }
        aria-disabled={ isDisabled }
        ref={ ref }
        { ...buttonProps }
      >
        { children }
      </button>
    </HeaderElement>
  );
});

BaseAccordionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  controlsId: PropTypes.string.isRequired,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  isExpanded: PropTypes.bool,
  isDisabled: PropTypes.bool,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

BaseAccordionHeader.defaultProps = {
  id: undefined,
  onKeyDown: undefined,
  isExpanded: false,
  isDisabled: false,
  headerProps: {},
  buttonProps: {},
};

BaseAccordionHeader.displayName = 'BaseAccordionHeader';

export default BaseAccordionHeader;
