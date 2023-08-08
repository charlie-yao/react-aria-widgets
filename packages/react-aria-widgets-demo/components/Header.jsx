import { useCallback } from 'react';
import Link from 'next/link';

//Styles
import styles from './Header.module.scss';

//Hooks
import useNavContext from '../hooks/useNavContext';

function Header() {
  const { isNavExpanded, setNavExpanded } = useNavContext();

  const onClick = useCallback(() => {
    setNavExpanded(!isNavExpanded);
  }, [ setNavExpanded, isNavExpanded ]);

  return (
    <header className={ styles.Header }>
      <div className={ styles.HeaderBrand }>
        <Link href="/">
          React ARIA Widgets
        </Link>
      </div>
      <div className={ styles.HeaderNav }>
        <a href="https://github.com/charlie-yao/react-aria-widgets">
          <i aria-hidden="true" className="fa-brands fa-github" />
          <span className="is-sr-only">
            GitHub
          </span>
        </a>
      </div>
      <div className={ styles.HeaderHamburger }>
        <button type="button" onClick={ onClick }>
          <i aria-hidden="true" className={ `fa-solid ${isNavExpanded ? 'fa-xmark' : 'fa-bars'} ` } />
          <span className="is-sr-only">
            { `${isNavExpanded ? 'Close' : 'Expand'} Navigation` }
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
