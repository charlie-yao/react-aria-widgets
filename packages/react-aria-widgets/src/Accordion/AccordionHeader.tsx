import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Contexts
import useAccordionContext from 'src/Accordion/useAccordionContext';
import useAccordionSectionContext from 'src/Accordion/useAccordionSectionContext';

//Types
import type { AccordionHeaderProps } from 'src/Accordion/types';

function AccordionHeader({
  children = null,
  headerProps = {},
  buttonProps = {},
}: AccordionHeaderProps) {
  const {
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleVisible,
    pushHeaderRef,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  } = useAccordionContext();
  const { id, headerHTMLId, panelHTMLId } = useAccordionSectionContext();
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const refCallback = useCallback((ref: HTMLButtonElement | null) => {
    pushHeaderRef(ref, id);
  }, [ id, pushHeaderRef ]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    toggleVisible(id);
  }, [ toggleVisible, id ]);

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

  return (
    <BaseAccordionHeader
      id={ headerHTMLId }
      controlsId={ panelHTMLId }
      headerLevel={ headerLevel }
      onClick={ handleClick }
      onKeyDown={ handleKeyDown }
      isExpanded={ isExpanded }
      isDisabled={ isDisabled }
      headerProps={ headerProps }
      buttonProps={ buttonProps }
      ref={ refCallback }
    >
      { children }
    </BaseAccordionHeader>
  );
}

AccordionHeader.propTypes = {
  children: PropTypes.node,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

export default AccordionHeader;
