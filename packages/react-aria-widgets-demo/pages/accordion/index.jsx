import dynamic from 'next/dynamic';

const DefaultAccordion = dynamic(
	() => import('./DefaultAccordion'),
	{
		ssr: false,
		loading: () => <p>Loading, please wait...</p>,
	},
);

export default function AccordionPage() {
	return (
		<article>
			<h1>Accordion</h1>
			<p>
				An <a href="https://www.w3.org/TR/wai-aria-practices-1.2/#accordion">accordion</a> is
				a collection of vertically-stacked content where each bit of content has an interactive
				heading and the content itself. The heading is used to control the visibility of the content.
			</p>
			<h2>Usage and Examples</h2>
			<h3>Default</h3>
			<p>
				A basic accordion consists of an <code>&lt;Accordion&gt;</code> wrapping around
				one or more <code>&lt;AccordionSection&gt;</code>s, where
				each <code>&lt;AccordionSection&gt;</code> has an <code>&lt;AccordionHeader&gt;</code> and
				an <code>&lt;AccordionPanel&gt;</code>.
			</p>
			<p>
				A <code>headerLevel</code> prop must be supplied to the <code>&lt;Accordion&gt;</code>,
				and each <code>&lt;AccordionSection&gt;</code> must have a unique <code>id</code> prop.
			</p>
			<DefaultAccordion />
			<p>
				By default, multiple sections can be expanded and closed at the same time. Note that
				if the <code>allowMultiple</code> prop is <code>true</code>, then
				the <code>allowToggle</code> will also always be true. Otherwise, users could run into a
				situation with many open sections that can't be closed.
			</p>
			<h2>Higher-Order Components and Hooks</h2>
			<h3><code>withAccordionManager</code></h3>
			<h2>Components</h2>
			<h3><code>&lt;Accordion&gt;</code></h3>
			<h3><code>&lt;AccordionSection&gt;</code></h3>
			<h3><code>&lt;AccordionHeader&gt;</code></h3>
			<h3><code>&lt;AccordionPanel&gt;</code></h3>
			<h2>Keyboard Support</h2>
			<h2>Notes</h2>
			<h2>Base Components</h2>
			<h3><code>&lt;BaseAccordionHeader&gt;</code></h3>
			<h3><code>&lt;BaseAccordionPanel&gt;</code></h3>
			<ul>
				<li>mention using <code>&lt;section&gt;</code> versus <code>&lt;div&gt;</code></li>
				<li>where to put render function documentation? in usage and examples? in accordion section?</li>
			</ul>
		</article>
	);
}
