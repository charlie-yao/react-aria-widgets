import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionHeader from './BaseAccordionHeader';

//Contexts
import useAccordionContext from '../hooks/useAccordionContext';
import useAccordionItemContext from '../hooks/useAccordionItemContext';

//Misc.
import { DEFAULT_ACCORDION_HEADER_ELEMENT_CSS_CLASS, DEFAULT_ACCORDION_BUTTON_ELEMENT_CSS_CLASS } from '../utils';

//Types
import type {
  AccordionRenderFunction,
  AccordionRenderClass,
  AccordionRenderStyle,
} from '../types';
import type { BaseAccordionHeaderElementProps, BaseAccordionButtonElementProps } from './BaseAccordionHeader';

export type AccordionHeaderElementProps = {
  className?: string | AccordionRenderClass;
  style?: React.CSSProperties | AccordionRenderStyle;
} & Omit<BaseAccordionHeaderElementProps, 'className' | 'style'>;

export type AccordionButtonElementProps = {
  className?: string | AccordionRenderClass;
  style?: React.CSSProperties | AccordionRenderStyle;
} & Omit<BaseAccordionButtonElementProps, 'className' | 'style'>;

export interface AccordionHeaderProps {
  children?: React.ReactNode | AccordionRenderFunction;
  headerProps?: AccordionHeaderElementProps;
  buttonProps?: AccordionButtonElementProps;
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
    pushItemRef,
    focusPrevItem,
    focusNextItem,
    focusFirstItem,
    focusLastItem,
  } = accordionContext;
  const { id, headerHTMLId, panelHTMLId } = accordionItemContext;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const refCallback = useCallback((ref: HTMLButtonElement | null) => {
    pushItemRef(ref, id);
  }, [ id, pushItemRef ]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    toggleExpanded(id);
  }, [ toggleExpanded, id ]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = useCallback((event) => {
    const { key } = event;

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevItem(id);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextItem(id);
    }
    else if(key === 'Home') {
      event.preventDefault();
      focusFirstItem();
    }
    else if(key === 'End') {
      event.preventDefault();
      focusLastItem();
    }
  }, [
    focusPrevItem,
    focusNextItem,
    focusFirstItem,
    focusLastItem,
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
      className = DEFAULT_ACCORDION_HEADER_ELEMENT_CSS_CLASS;

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
      className = DEFAULT_ACCORDION_BUTTON_ELEMENT_CSS_CLASS;

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
  headerProps: PropTypes.object as React.Validator<AccordionHeaderElementProps>,
  buttonProps: PropTypes.object as React.Validator<AccordionButtonElementProps>,
};

export default AccordionHeader;
