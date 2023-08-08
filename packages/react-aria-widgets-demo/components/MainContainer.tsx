//Styles
import styles from './MainContainer.module.scss';

//Types
import { ReactNode } from 'react';

interface MainContainerProps {
  children?: ReactNode;
}

function MainContainer({ children }: MainContainerProps) {
  return (
    <div className={ styles.MainContainer }>
      { children }
    </div>
  );
}

export default MainContainer;
