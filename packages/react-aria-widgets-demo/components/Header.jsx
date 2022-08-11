import Link from 'next/link';

export default function Header() {
	return (
		<header className="navbar">
			<div className="navbar-brand">
				<Link href="/">
					<a className="navbar-item">React ARIA Widgets</a>
				</Link>
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
