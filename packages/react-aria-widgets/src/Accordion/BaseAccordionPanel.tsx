/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

const VALID_TAGS = ['section', 'div'] as const;

type ValidTags = typeof VALID_TAGS[number];

interface BaseAccordionPanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
  labelId?: string;
  tagName?: ValidTags;
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

  const Component = tagName;

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
  tagName: PropTypes.oneOf(VALID_TAGS),
  className: PropTypes.string,
};

export default BaseAccordionPanel;
