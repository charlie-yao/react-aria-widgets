/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

/**
 * Creates a HOC that essentially does nothing. This is meant to
 * be a workaround for an issue with React.cloneElement where if you
 * have a component that automatically passes props to its children via
 * React.cloneElement and those props are marked as required, the
 * children will complain that those props are missing.
 *
 * @see @link{https://github.com/facebook/react/issues/6653}
 *
 * @param {React.ComponentType} Component
 * @return {React.ComponentType}
 */
export default function withNoOp(Component: React.ComponentType): React.ComponentType {
  const NoOp = React.forwardRef((props, ref) => (
    <Component { ...props } ref={ ref } />
  ));

  NoOp.displayName = 'NoOp';

  return NoOp;
}
