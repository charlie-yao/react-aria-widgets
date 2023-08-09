/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

//Types
import type { ValidHTMLHeaderLevels } from 'src/utils/types';

//Misc
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

export type BaseHeaderProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'children' | 'dangerouslySetInnerHTML'
>;

export type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' |
  'dangerouslySetInnerHTML' |
  'type' |
  'id' |
  'aria-controls' |
  'onClick' |
  'onKeyDown' |
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
  headerProps?: BaseHeaderProps;
  buttonProps?: BaseButtonProps;
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
