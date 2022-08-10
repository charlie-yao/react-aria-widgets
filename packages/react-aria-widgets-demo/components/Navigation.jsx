import Link from 'next/link';

//Components and Styles
import styles from './Navigation.module.scss';

export default function Navigation() {
	return (
		<nav className={ `${styles.Navigation} column is-one-fifth menu` }>
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
