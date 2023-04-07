import React from 'react';
import PropTypes from 'prop-types';

//HOCs
import withNoOp from 'src/hocs/withNoOp';

//Misc.
import { validateHeaderLevelProp } from 'src/utils/propTypes';

//TypeScript Interfaces and Types
import { AccordionManagerConsumerProps } from 'src/Accordion/withAccordionManager';

export interface AccordionSectionProps extends AccordionManagerConsumerProps {
  children: React.ReactElement;
  id: string;
  index: number;
  onClick: React.MouseEventHandler<HTMLElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLElement>;
  headerLevel: number;
}

function AccordionSection(props: AccordionSectionProps) {
  const {
    children,
    id,
    index,
    headerLevel,
    onClick,
    onKeyDown,
    allowMultiple,
    allowToggle,
    getIsExpanded,
    getIsDisabled,
    toggleSection,
    setHeaderRef,
    focusHeader,
    focusPrevHeader,
    focusNextHeader,
    focusFirstHeader,
    focusLastHeader,
  } = props;

  const body = React.Children.map(children, child => {
    return React.cloneElement(child, {
      id,
      index,
      headerLevel,
      onClick,
      onKeyDown,
      allowMultiple,
      allowToggle,
      getIsExpanded,
      getIsDisabled,
      toggleSection,
      setHeaderRef,
      focusHeader,
      focusPrevHeader,
      focusNextHeader,
      focusFirstHeader,
      focusLastHeader,
    });
  });

  return (
    <>
      { body }
    </>
  );
}

AccordionSection.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  //From <Accordion>
  index: PropTypes.number.isRequired,
  headerLevel: validateHeaderLevelProp.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  //From <AccordionManager>
  allowMultiple: PropTypes.bool.isRequired,
  allowToggle: PropTypes.bool.isRequired,
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

export default withNoOp(AccordionSection);
