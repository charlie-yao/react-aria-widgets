import React from 'react';
import PropTypes from 'prop-types';

//Components and Styles
import BaseAccordionHeader from 'src/Accordion/BaseAccordionHeader';

//HOCs
import withNoOp from 'src/hocs/withNoOp';

//Misc.
import { getPanelId } from 'src/Accordion/utils';
import { validateHeaderLevelProp } from 'src/utils/propTypes';

interface AccordionHeaderProps {
  children: React.ReactNode;
  id: string;
  index: number;
  headerLevel: number;
  setHeaderRef: (ref: HTMLButtonElement) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  getIsExpanded: (id: string) => boolean;
  getIsDisabled: (id: string) => boolean;
  headerProps?: object;
  buttonProps?: object;
}

function AccordionHeader(props: AccordionHeaderProps) {
  const {
    children,
    id,
    index,
    headerLevel,
    setHeaderRef,
    onClick,
    onKeyDown,
    getIsExpanded,
    getIsDisabled,
    headerProps,
    buttonProps,
  } = props;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const _buttonProps = Object.assign({}, buttonProps, {
    'data-index': index,
  });

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
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  headerLevel: validateHeaderLevelProp.isRequired,
  setHeaderRef: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  getIsExpanded: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func.isRequired,
  headerProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

AccordionHeader.defaultProps = {
  headerProps: {},
  buttonProps: {},
};

export default withNoOp(AccordionHeader);
