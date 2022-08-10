import Link from 'next/link';

export default function HomePage() {
	return (
		<article className="content">
			<h1>React ARIA Widgets</h1>
			<p>
				React ARIA Widgets is a collection of React components designed
				to help developers implement the patterns found in
				the <a href="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices Guide (APG)</a>.
			</p>
			<p>
				Please note that this library should <strong>NOT</strong> be used in a production environment! 
				It was developed primarily for educational purposes, and longterm
				support in the form of additional features, bug fixes, maintenance, or etc. cannot
				be guaranteed!
			</p>
			<h2>Features</h2>
			<ul>
				<li>
					<Link href="/support/#faq-mostly-unstyled"><a>(Mostly) unstyled</a></Link> components
					that are easily composable and customizable.
				</li>
				<li>
					Modular design that abstracts stateful logic into higher-order components (HOCs) and React hooks.
				</li>
				<li>
					Unopinionated <Link href="/getting-started/#getting-started-base-components"><a>base
					components</a></Link> with PropTypes that dictate the necessary HTML/ARIA attributes
					for developers who need more fine-tuned control.
				</li>
				<li>
					Adheres to the APG complete with focus control and full keyboard support.
				</li>
			</ul>
		</article>
	);
}
