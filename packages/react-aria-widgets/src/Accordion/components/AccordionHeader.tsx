import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionHeader from './BaseAccordionHeader';

//Contexts
import useAccordionContext from '../hooks/useAccordionContext';
import useAccordionItemContext from '../hooks/useAccordionItemContext';

//Types
import type {
  AccordionRenderFunction,
  AccordionRenderClass,
  AccordionRenderStyle,
} from '../types';
import type { BaseHeaderProps, BaseButtonProps } from './BaseAccordionHeader';

export type HeaderProps = {
  className?: string | AccordionRenderClass;
  style?: React.CSSProperties | AccordionRenderStyle;
} & Omit<BaseHeaderProps, 'className' | 'style'>;

export type ButtonProps = {
  className?: string | AccordionRenderClass;
  style?: React.CSSProperties | AccordionRenderStyle;
} & Omit<BaseButtonProps, 'className' | 'style'>;

export interface AccordionHeaderProps {
  children?: React.ReactNode | AccordionRenderFunction;
  headerProps?: HeaderProps;
  buttonProps?: ButtonProps;
}

function AccordionHeader({
  children = null,
  headerProps = {},
  buttonProps = {},
}: AccordionHeaderProps) {
  const accordionContext = useAccordionContext();
  const accordionItemContext = useAccordionItemContext();
  const {
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleExpanded,
    pushHeaderRef,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  } = accordionContext;
  const { id, headerHTMLId, panelHTMLId } = accordionItemContext;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const refCallback = useCallback((ref: HTMLButtonElement | null) => {
    pushHeaderRef(ref, id);
  }, [ id, pushHeaderRef ]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    toggleExpanded(id);
  }, [ toggleExpanded, id ]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = useCallback((event) => {
    const { key } = event;

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevHeader(id);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextHeader(id);
    }
    else if(key === 'Home') {
      event.preventDefault();
      focusFirstHeader();
    }
    else if(key === 'End') {
      event.preventDefault();
      focusLastHeader();
    }
  }, [
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
    id,
  ]);

  const combinedContext = useMemo(() => {
    return {
      ...accordionContext,
      ...accordionItemContext,
    };
  }, [ accordionContext, accordionItemContext ]);

  const _headerProps = useMemo(() => {
    let className;
    let style;

    if(typeof headerProps.className === 'function')
      className = headerProps.className({ allowMultiple, allowCollapseLast, headerLevel, isExpanded, isDisabled });
    else if(typeof headerProps.className === 'string')
      className = headerProps.className;
    else
      className = 'react-aria-widgets-accordion-header';

    if(typeof headerProps.style === 'function')
      style = headerProps.style({ allowMultiple, allowCollapseLast, headerLevel, isExpanded, isDisabled });
    else
      style = headerProps.style;

    return {
      ...headerProps,
      className,
      style,
      'data-expanded': isExpanded,
      'data-disabled': isDisabled,
    };
  }, [
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    isExpanded,
    isDisabled,
    headerProps,
  ]);

  const _buttonProps = useMemo(() => {
    let className;
    let style;

    if(typeof buttonProps.className === 'function')
      className = buttonProps.className({ allowMultiple, allowCollapseLast, headerLevel, isExpanded, isDisabled });
    else if(typeof buttonProps.className === 'string')
      className = buttonProps.className;
    else
      className = 'react-aria-widgets-accordion-button';

    if(typeof buttonProps.style === 'function')
      style = buttonProps.style({ allowMultiple, allowCollapseLast, headerLevel, isExpanded, isDisabled });
    else
      style = buttonProps.style;

    return {
      ...buttonProps,
      className,
      style,
    };
  }, [
    allowMultiple,
    allowCollapseLast,
    headerLevel,
    isExpanded,
    isDisabled,
    buttonProps,
  ]);

  return (
    <BaseAccordionHeader
      id={ headerHTMLId }
      headerLevel={ headerLevel }
      onClick={ handleClick }
      onKeyDown={ handleKeyDown }
      aria-controls={ panelHTMLId }
      aria-expanded={ isExpanded }
      aria-disabled={ isDisabled }
      headerProps={ _headerProps }
      buttonProps={ _buttonProps }
      ref={ refCallback }
    >
      { typeof children === 'function' ? children(combinedContext) : children }
    </BaseAccordionHeader>
  );
}

AccordionHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

export default AccordionHeader;
