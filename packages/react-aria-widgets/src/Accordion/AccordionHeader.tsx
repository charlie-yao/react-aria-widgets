import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Types
import { accordionSectionProp } from 'src/Accordion/propTypes';
import type { AccordionHeaderProps } from 'src/Accordion/types';

//Misc.
import { getPanelId } from 'src/Accordion/utils';
import { VALID_HTML_HEADER_LEVELS } from 'src/utils';

function AccordionHeader({
  children,
  headerProps = {},
  buttonProps = {},
  index,
  headerLevel,
  sections,
  getIsExpanded,
  getIsDisabled,
  toggleSection,
  pushHeaderRef,
  focusPrevHeader,
  focusNextHeader,
  focusFirstHeader,
  focusLastHeader,
}: AccordionHeaderProps) {
  const section = sections[index];
  const { id } = section;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const _buttonProps = Object.assign({}, buttonProps, {
    'data-index': index,
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    toggleSection(event.currentTarget.id);
  }, [ toggleSection ]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = useCallback((event) => {
    const { key, currentTarget } = event;

    if(!currentTarget.dataset.index)
      return;

    const index = Number.parseInt(currentTarget.dataset.index, 10);

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevHeader(index);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextHeader(index);
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
      onKeyDown={ handleKeyDown }
      controlsId={ getPanelId(id) }
      headerLevel={ headerLevel }
      onClick={ handleClick }
      isExpanded={ isExpanded }
      isDisabled={ isDisabled }
      headerProps={ headerProps }
      buttonProps={ _buttonProps }
      ref={ pushHeaderRef }
    >
      { children }
    </BaseAccordionHeader>
  );
}

AccordionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
  //From <Accordion>
  index: PropTypes.number.isRequired,
  headerLevel: PropTypes.oneOf(VALID_HTML_HEADER_LEVELS).isRequired,
  sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  //From <Accordion> methods
  getIsExpanded: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func.isRequired,
  toggleSection: PropTypes.func.isRequired,
  pushHeaderRef: PropTypes.func.isRequired,
  focusPrevHeader: PropTypes.func.isRequired,
  focusNextHeader: PropTypes.func.isRequired,
  focusFirstHeader: PropTypes.func.isRequired,
  focusLastHeader: PropTypes.func.isRequired,
};

export default AccordionHeader;
