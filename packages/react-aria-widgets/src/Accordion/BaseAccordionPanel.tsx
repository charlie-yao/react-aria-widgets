/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

interface BaseAccordionPanelProps {
  children: React.ReactNode;
  id: string;
  labelId?: string;
  tagName?: string;
}

function BaseAccordionPanel(props: BaseAccordionPanelProps) {
  const { children, id, labelId, tagName, ...rest } = props;
  const Component = tagName as keyof JSX.IntrinsicElements;

  return (
    <Component id={ id } aria-labelledby={ labelId } { ...rest }>
      { children }
    </Component>
  );
}

BaseAccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string,
  tagName: PropTypes.string,
};

BaseAccordionPanel.defaultProps = {
  labelId: undefined,
  tagName: 'section',
};

export default BaseAccordionPanel;
