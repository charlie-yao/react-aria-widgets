import Link from 'next/link';

export default function Header(props) {
	const { isNavExpanded, setNavExpanded } = props;

	return (
		<header className="navbar" style={{ position: 'sticky', top: 0 }}>
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
}
