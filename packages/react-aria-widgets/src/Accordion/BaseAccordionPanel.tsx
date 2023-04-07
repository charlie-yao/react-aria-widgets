/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

export interface BaseAccordionPanelProps {
  children: React.ReactNode;
  id: string;
  labelId?: string;
  tagName?: string;
  className?: string;
}

function BaseAccordionPanel(props: BaseAccordionPanelProps) {
  const {
    children,
    id,
    labelId,
    tagName = 'section',
    className,
    ...rest
  } = props;

  const Component = tagName as keyof JSX.IntrinsicElements;

  return (
    <Component
      id={ id }
      aria-labelledby={ labelId }
      className={ className }
      { ...rest }
    >
      { children }
    </Component>
  );
}

BaseAccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string,
  tagName: PropTypes.string,
  className: PropTypes.string,
};

export default BaseAccordionPanel;
