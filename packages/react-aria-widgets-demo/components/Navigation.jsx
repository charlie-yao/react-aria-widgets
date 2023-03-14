import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Components and Styles
import styles from './Navigation.module.scss';

function Navigation(props) {
  const { isNavExpanded } = props;
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className={ `${styles.Navigation} ${isNavExpanded ? styles.expanded : ''} menu` }>
      <div className={ styles.NavigationWrapper }>
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li>
            <Link href="/" className={ pathname === '/' ? 'is-active' : '' }>
              Home
            </Link>
          </li>
          <li>
            <Link href="/getting-started" className={ pathname === '/getting-started' ? 'is-active' : '' }>
              Getting Started
            </Link>
          </li>
          <li>
            <Link href="/support" className={ pathname === '/support' ? 'is-active' : '' }>
              Support
            </Link>
          </li>
        </ul>
        <p className="menu-label">
          Patterns
        </p>
        <ul className="menu-list">
          <li>
            <Link href="/accordion" className={ pathname === '/accordion' ? 'is-active' : '' }>
              Accordion
            </Link>
          </li>
        </ul>
        <p className="menu-label">
          Links
        </p>
        <ul className="menu-list">
          <li>
            <a href="https://github.com/charlie-yao/react-aria-widgets">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  isNavExpanded: PropTypes.bool.isRequired,
};

export default Navigation;
