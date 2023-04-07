/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

interface BaseAccordionHeaderProps {
  children: React.ReactNode;
  id?: string;
  controlsId: string;
  headerLevel: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  isExpanded?: boolean;
  isDisabled?: boolean;
  headerProps?: object;
  buttonProps?: object;
};

const BaseAccordionHeader = React.forwardRef<HTMLButtonElement, BaseAccordionHeaderProps>((props, ref) => {
  const {
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
