//Styles
import styles from './Main.module.scss';

//Types
import type { ReactNode } from 'react';

interface MainProps {
  children?: ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className={ styles.Main }>
      { children }
    </main>
  );
}

export default Main;
