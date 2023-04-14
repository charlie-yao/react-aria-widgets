import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Types
import { validateHeaderLevelProp } from 'src/utils/propTypes';
import { accordionSectionProp } from 'src/Accordion/propTypes';
import { AccordionHeaderProps } from 'src/Accordion/types';

//Misc.
import { getPanelId } from 'src/Accordion/utils';

function AccordionHeader(props: AccordionHeaderProps) {
  const {
    children,
    headerProps = {},
    buttonProps = {},
    index,
    headerLevel,
    sections,
    getIsExpanded,
    getIsDisabled,
    toggleSection,
    setHeaderRef,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  } = props;
  const section = sections[index];
  const { id } = section;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const _buttonProps = Object.assign({}, buttonProps, {
    'data-index': index,
  });

  const onClick: React.MouseEventHandler<HTMLElement> = (event) => {
    toggleSection(event.currentTarget.id);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
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
  };

  return (
    <BaseAccordionHeader
      id={ id }
      controlsId={ getPanelId(id) }
      headerLevel={ headerLevel }
      onClick={ onClick }
      onKeyDown={ onKeyDown }
      isExpanded={ isExpanded }
      isDisabled={ isDisabled }
      headerProps={ headerProps }
      buttonProps={ _buttonProps }
      ref={ setHeaderRef }
    >
      { children }
    </BaseAccordionHeader>
  );
}

AccordionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
  //From <Accordion<
  index: PropTypes.number.isRequired,
  headerLevel: validateHeaderLevelProp.isRequired,
  sections: PropTypes.arrayOf(accordionSectionProp.isRequired).isRequired,
  //From <AccordionManager>
  getIsExpanded: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func.isRequired,
  toggleSection: PropTypes.func.isRequired,
  setHeaderRef: PropTypes.func.isRequired,
  focusHeader: PropTypes.func.isRequired,
  focusPrevHeader: PropTypes.func.isRequired,
  focusNextHeader: PropTypes.func.isRequired,
  focusFirstHeader: PropTypes.func.isRequired,
  focusLastHeader: PropTypes.func.isRequired,
};

export default AccordionHeader;
