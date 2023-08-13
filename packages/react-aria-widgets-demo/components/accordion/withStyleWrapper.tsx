/* eslint-disable react/jsx-props-no-spreading */

//Styles
import styles from './StyleWrapper.module.scss';

//Types
import type { ComponentType } from 'react';

export default function withStyleWrapper<P extends {}>(Component: ComponentType<P>) {
  function StyleWrapper(props: P) {
    return (
      <div className={ styles.StyleWrapper }>
        <Component { ...props } />
      </div>
    );
  }

  StyleWrapper.displayName = 'StyleWrapper';

  return StyleWrapper;
}
