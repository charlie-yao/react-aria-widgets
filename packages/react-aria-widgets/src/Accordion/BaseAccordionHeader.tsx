/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import { validateHeaderLevelProp } from 'src/utils/propTypes';
import { BaseAccordionHeaderProps } from 'src/Accordion/types';

const BaseAccordionHeader = React.forwardRef<HTMLButtonElement, BaseAccordionHeaderProps>((props, ref) => {
  const {
    children,
    id,
    controlsId,
    headerLevel,
    onClick,
    onKeyDown,
    isExpanded = false,
    isDisabled = false,
    headerProps = {},
    buttonProps = {},
  } = props;

  const HeaderElement = `h${headerLevel}` as keyof JSX.IntrinsicElements;

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
  headerLevel: validateHeaderLevelProp.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  isExpanded: PropTypes.bool,
  isDisabled: PropTypes.bool,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

BaseAccordionHeader.displayName = 'BaseAccordionHeader';

export default BaseAccordionHeader;
