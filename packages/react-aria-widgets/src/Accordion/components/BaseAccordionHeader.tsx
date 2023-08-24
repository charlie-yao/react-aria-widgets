/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type { ValidHTMLHeaderLevels } from '../../types';

//Misc
import { VALID_HTML_HEADER_LEVELS, VALID_HTML_HEADER_LEVELS_SET } from '../../utils';

export type BaseAccordionHeaderElementProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'children' | 'dangerouslySetInnerHTML'
>;

export type BaseAccordionButtonElementProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' |
  'dangerouslySetInnerHTML' |
  'type' |
  'id' |
  'onClick' |
  'onKeyDown' |
  'aria-controls' |
  'aria-expanded' |
  'aria-disabled'
>;

export type BaseAccordionHeaderProps = React.PropsWithChildren<{
  id?: string | undefined;
  headerLevel: ValidHTMLHeaderLevels;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  'aria-controls': string;
  'aria-expanded': boolean;
  'aria-disabled': boolean;
  headerProps?: BaseAccordionHeaderElementProps;
  buttonProps?: BaseAccordionButtonElementProps;
}>;

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
  if(!VALID_HTML_HEADER_LEVELS_SET.has(headerLevel))
    throw new Error(`headerLevel prop must be an integer from 1 to 6 (inclusive), but received: ${headerLevel}`);

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
  children: PropTypes.node,
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
  children: null,
  id: undefined,
  onKeyDown: undefined,
  headerProps: {},
  buttonProps: {},
};

BaseAccordionHeader.displayName = 'BaseAccordionHeader';

export default BaseAccordionHeader;
