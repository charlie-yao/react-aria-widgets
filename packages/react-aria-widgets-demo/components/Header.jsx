import Link from 'next/link';

//Components and Styles
import styles from './Header.module.scss';

export default function Header(props) {
	const { isNavExpanded, setNavExpanded } = props;
	
	return (
		<header className={ `${styles.Header} has-background-white` }>
			<div className={ styles.HeaderBrand }>
				<Link href="/">
					<a>
						React ARIA Widgets
					</a>
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
				<button type="button">
					<i aria-hidden="true" className="fa-solid fa-bars" />
					<span className="is-sr-only">
						Navigation
					</span>
				</button>
			</div>
		</header>
	);
}
