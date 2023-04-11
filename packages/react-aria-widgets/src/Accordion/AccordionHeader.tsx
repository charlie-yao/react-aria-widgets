import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//Misc.
import { getPanelId } from 'src/Accordion/utils';
import { validateHeaderLevelProp } from 'src/utils/propTypes';

interface AccordionHeaderProps {
  children: React.ReactNode;
  headerProps?: object;
  buttonProps?: object;
  id: string;
  index: number;
  headerLevel: number;
  getIsExpanded: (id: string) => boolean;
  getIsDisabled: (id: string) => boolean;
  toggleSection: (id: string) => void;
  setHeaderRef: (ref: HTMLButtonElement) => void;
  focusPrevHeader: (index: number) => void;
  focusNextHeader: (index: number) => void;
  focusFirstHeader: () => void;
  focusLastHeader: () => void;
};

function AccordionHeader(props: AccordionHeaderProps) {
  const {
    children,
    headerProps = {},
    buttonProps = {},
    id,
    index,
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleSection,
    setHeaderRef,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  } = props;
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
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  headerLevel: validateHeaderLevelProp.isRequired,
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
