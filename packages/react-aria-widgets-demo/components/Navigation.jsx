import Link from 'next/link';

//Components and Styles
import styles from './Navigation.module.scss';

export default function Navigation(props) {
	const { isNavExpanded } = props;

	return (
		<nav className={ `${styles.Navigation} ${isNavExpanded ? styles.expanded : ''} menu` }>
			<div className={ styles.NavigationWrapper }>
				<p className="menu-label">
					General
				</p>
				<ul className="menu-list">
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					<li>
						<Link href="/getting-started">
							<a>Getting Started</a>
						</Link>
					</li>
					<li>
						<Link href="/support">
							<a>Support</a>
						</Link>
					</li>
				</ul>
				<p className="menu-label">
					Patterns
				</p>
				<ul className="menu-list">
					<li>
						<Link href="/accordion">
							<a>Accordion</a>
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
