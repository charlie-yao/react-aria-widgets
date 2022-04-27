export default function SupportPage() {
	return (
		<article>
			<h1>Support</h1>
			<p>
				Please note that this library should <strong>NOT</strong> be used in a production environment! 
				It was developed primarily for educational purposes, and I cannot guarantee longterm
				support in the form of additional features, bug fixes, maintenance, etc.!
			</p>
			<p>
				Please feel free to make an issue on <a href="https://github.com/charlie-yao/react-aria-widgets">GitHub</a>,
				but as before, I cannot guarantee any timeframes for resolutions.
			</p>
			<h2>Frequently Asked Questions (FAQ)</h2>
			<details id="faq-mostly-unstyled">
				<summary>Included Styling</summary>
				The components provided by React Aria Widgets strives to be as unstyled as possible,
				but there are cases where styling is included by default. For example, the accordion widget
				uses <code>display: none !important;</code> by default to handle the expand/collapse states.
				However, even in those cases, React Aria Widgets will try to provide unopinionated alternatives
				without any styling.
			</details>
			<details id="faq-hidden-vs-display-none">
				<summary><code>hidden</code> versus <code>display: none;</code></summary>
				At the time of writing, many examples shown in WAI-Aria Authoring Practices 1.2 will use the
				<code>hidden</code> HTML attribute to handle expand/collapse states. However, some of the authors
				of those examples eventually decided that <code>display: none;</code> was a much better option,
				though the examples that are live currently do not reflect those changes.
			</details>
		</article>
	);
}
