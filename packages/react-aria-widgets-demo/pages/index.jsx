import Link from 'next/link';

export default function HomePage() {
	return (
		<article>
			<h1>React Aria Widgets</h1>
			<p>
				React Aria Widgets is a collection of low-level React components designed
				to help developers implement the design patterns and widgets found
				in <a href="https://www.w3.org/TR/wai-aria-practices-1.2/">WAI-ARIA Authoring Practices 1.2</a>.
			</p>
			<aside>
				<p>
					<small>Please note that this library should <strong>NOT</strong> be used in a production environment! 
					It was developed primarily for educational purposes, and I cannot guarantee longterm
					support in the form of additional features, bug fixes, maintenance, etc.!</small>
				</p>
			</aside>
			<h2>Features</h2>
			<ul>
				<li>
					<Link href="support/#faq-mostly-unstyled"><a>(Mostly) unstyled</a></Link> components
					that are easily composable and customizable.
				</li>
				<li>
					Modular components that separate out stateful logic into higher-order components (HOCs).
				</li>
				<li>
					Full keyboard support.
				</li>
				<li>
					Adheres to the <a href="https://www.w3.org/TR/wai-aria-practices-1.2/">WAI-ARIA Authoring Practices 1.2</a>.\
				</li>
			</ul>
		</article>
	);
}
