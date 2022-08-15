import Link from 'next/link';

//Components and Styles
import styles from './Navigation.module.scss';

export default function Navigation(props) {
	const { isNavExpanded } = props;

	console.log(isNavExpanded);

	return (
		<nav className={ `${styles.Navigation} ${isNavExpanded ? styles.expanded : ''} menu` }>
			<ul className="menu-list" style={{ position: 'sticky', top: '3.25rem' }}>
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
					<span className="submenu-label">Patterns</span>
					<ul>
						<li>
							<Link href="/accordion">
								<a>Accordion</a>
							</Link>
						</li>
					</ul>
				</li>
				<li>
					<Link href="/support">
						<a>Support</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
