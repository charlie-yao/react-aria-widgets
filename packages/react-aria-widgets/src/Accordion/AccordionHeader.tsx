import React from 'react';
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
    pushHeaderRef,
    handleClick,
    handleKeyDown,
  } = useAccordionContext();
  const { id, headerHTMLId, panelHTMLId } = useAccordionSectionContext();
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

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
