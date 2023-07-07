import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

//Components
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Contexts
import AccordionContext from 'src/Accordion/AccordionContext';
import AccordionSectionContext from 'src/Accordion/AccordionSectionContext';

//Types
//import { accordionSectionProp } from 'src/Accordion/propTypes';
import type { AccordionHeaderProps } from 'src/Accordion/types';

//Misc.
import { getPanelId } from 'src/Accordion/utils';
//import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

function AccordionHeader({
  children,
  headerProps = {},
  buttonProps = {},
  //index,
  //headerLevel,
  //sections,
  //getIsExpanded,
  //getIsDisabled,
  //toggleSection,
  //pushHeaderRef,
  //focusPrevHeader,
  //focusNextHeader,
  //focusFirstHeader,
  //focusLastHeader,
}: AccordionHeaderProps) {
  //const section = sections[index];
  //const { id } = section;
  const accordionMethods = useContext(AccordionContext);
  const id = useContext(AccordionSectionContext);

  if(!accordionMethods)
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
  } = accordionMethods;
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
  //From <Accordion>
  //index: PropTypes.number.isRequired,
  //headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  //sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  //From <Accordion> methods
  //getIsExpanded: PropTypes.func.isRequired,
  //getIsDisabled: PropTypes.func.isRequired,
  //toggleSection: PropTypes.func.isRequired,
  //pushHeaderRef: PropTypes.func.isRequired,
  //focusPrevHeader: PropTypes.func.isRequired,
  //focusNextHeader: PropTypes.func.isRequired,
  //focusFirstHeader: PropTypes.func.isRequired,
  //focusLastHeader: PropTypes.func.isRequired,
};

export default AccordionHeader;
