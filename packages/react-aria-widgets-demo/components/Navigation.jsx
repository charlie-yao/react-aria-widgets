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
						<Link href="/">
							<a className={ pathname === '/' ? 'is-active' : '' }>Home</a>
						</Link>
					</li>
					<li>
						<Link href="/getting-started">
							<a className={ pathname === '/getting-started' ? 'is-active' : '' }>Getting Started</a>
						</Link>
					</li>
					<li>
						<Link href="/support">
							<a className={ pathname === '/support' ? 'is-active' : '' }>Support</a>
						</Link>
					</li>
				</ul>
				<p className="menu-label">
					Patterns
				</p>
				<ul className="menu-list">
					<li>
						<Link href="/accordion">
							<a className={ pathname === '/accordion' ? 'is-active' : '' }>Accordion</a>
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
