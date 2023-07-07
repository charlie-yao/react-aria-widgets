import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Contexts
import AccordionContext from 'src/Accordion/AccordionContext';
import AccordionSectionContext from 'src/Accordion/AccordionSectionContext';

//Types
import type { AccordionHeaderProps } from 'src/Accordion/types';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionHeader({
  children = null,
  headerProps = {},
  buttonProps = {},
}: AccordionHeaderProps) {
  const accordionContext = useContext(AccordionContext);
  const id = useContext(AccordionSectionContext);

  if(!accordionContext)
    throw new Error('React ARIA Widgets - AccordionHeader received a falsy value when consuming an AccordionContext');
  if(!id)
    throw new Error('React ARIA Widgets - AccordionHeader received a falsy value when consuming an AccordionSectionContext');

  const {
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleSection,
    pushHeaderRef,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  } = accordionContext;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    toggleSection(event.currentTarget.id);
  }, [ toggleSection ]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = useCallback((event) => {
    const { key } = event;

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevHeader(event);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextHeader(event);
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
  ]);

  return (
    <BaseAccordionHeader
      id={ id }
      controlsId={ getPanelId(id) }
      headerLevel={ headerLevel }
      onClick={ handleClick }
      onKeyDown={ handleKeyDown }
      isExpanded={ isExpanded }
      isDisabled={ isDisabled }
      headerProps={ headerProps }
      buttonProps={ buttonProps }
      ref={ pushHeaderRef }
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
