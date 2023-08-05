import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Contexts
import useAccordionContext from 'src/Accordion/useAccordionContext';
import useAccordionItemContext from 'src/Accordion/useAccordionItemContext';

//Types
import type { AccordionHeaderProps } from 'src/Accordion/types';

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
    }
  }, [ headerProps ]);

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
  }, [ buttonProps ]);

  return (
    <BaseAccordionHeader
      id={ headerHTMLId }
      controlsId={ panelHTMLId }
      headerLevel={ headerLevel }
      onClick={ handleClick }
      onKeyDown={ handleKeyDown }
      isExpanded={ isExpanded }
      isDisabled={ isDisabled }
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
