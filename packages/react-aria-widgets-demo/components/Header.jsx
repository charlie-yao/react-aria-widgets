import Link from 'next/link';

//Components and Styles
import styles from './Header.module.scss';

export default function Header(props) {
	const { isNavExpanded, setNavExpanded } = props;
	
	return (
		<header className={ `${styles.Header} has-background-white` }>
			<div className={ styles.HeaderBrand }>
				<Link href="/">
					<a className={ styles.HeaderItem }>
						React ARIA Widgets
					</a>
				</Link>
			</div>
			<div className={ styles.HeaderNav }>
				<a
					className={ styles.HeaderItem }
					href="https://github.com/charlie-yao/react-aria-widgets"
				>
					<i aria-hidden="true" className="fa-brands fa-github" />
					<span className="is-sr-only">
						GitHub
					</span>
				</a>
				<button className={ styles.HeaderItem } type="button">
					<i aria-hidden="true" className="fa-solid fa-bars" />
					<span className="is-sr-only">
						Navigation
					</span>
				</button>
			</div>
		</header>
	);

	/*
	return (
		<header className={ `${styles.Header} navbar` }>
			<div className="navbar-brand">
				<Link href="/">
					<a className="navbar-item">React ARIA Widgets</a>
				</Link>
				<a
					role="button"
					className="navbar-burger"
					aria-label="Navigation"
					aria-expanded="false"
					onClick={ () => setNavExpanded(!isNavExpanded) }
				>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</a>
			</div>
			<div className="navbar-menu">
				<div className="navbar-end">
					<a className="navbar-item" href="https://github.com/charlie-yao/react-aria-widgets">
						GitHub
					</a>
				</div>
			</div>
		</header>
	);
	*/
}
