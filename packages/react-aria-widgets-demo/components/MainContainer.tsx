//Styles
import styles from './MainContainer.module.scss';

//Types
import type { ReactNode } from 'react';

interface MainContainerProps {
  children?: ReactNode;
}

function MainContainer({ children = null }: MainContainerProps) {
  return (
    <div className={ styles.MainContainer }>
      { children }
    </div>
  );
}

export default MainContainer;
