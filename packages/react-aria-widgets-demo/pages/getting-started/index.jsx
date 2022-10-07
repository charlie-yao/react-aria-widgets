import Head from 'next/head';
import Link from 'next/link';

//Components
import SyntaxHighlighter from '../../components/SyntaxHighlighter';

/* eslint-disable operator-linebreak */
const READY_TO_USE_EXAMPLE =
`import {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
} from 'react-aria-widgets/accordion';

export default function MyAccordion() {
	return (
		<Accordion headerLevel={ 2 }>
			<AccordionSection id="section-1">
				<AccordionHeader>
					Hello world!
				</AccordionHeader>
				<AccordionPanel>
					Goodbye!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="section-2">
				<AccordionHeader>
					Hello world!
				</AccordionHeader>
				<AccordionPanel>
					Goodbye!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`;
/* eslint-enable operator-linebreak */

export default function GettingStartedPage() {
	return (
		<>
			<Head>
				<title>Getting Started - React ARIA Widgets</title>
			</Head>
			<article className="container is-max-desktop content">
				<h1>Getting Started</h1>
				<p className="notification is-light is-info">
					Please note that this library should <strong>NOT</strong> be used in a production environment!
					It was developed primarily for educational purposes, and longterm
					support in the form of additional features, bug fixes, maintenance, or etc. cannot
					be guaranteed!
				</p>
				<h2>Installation</h2>
				<p>
					With npm:
				</p>
				<pre>
					<code>npm install react-aria-widgets</code>
				</pre>
				<p>
					With Yarn:
				</p>
				<pre>
					<code>yarn add react-aria-widgets</code>
				</pre>
				<h2>Usage</h2>
				<p>
					React ARIA Widgets provides two &quot;flavors&quot; of components. One flavor consists
					of &quot;ready-to-use&quot; components with the intention being that developers can simply
					provide their own styling and then drop them into their website. If state management logic is
					needed to fully satisfy the APG, React ARIA Widgets will provide it.
				</p>
				<p>
					If you wish to use the &quot;ready-to-use&quot; components, you must first import the stylesheet provided
					by React ARIA Widgets. Though the provided components are
					{ ' ' }
					<Link href="/support/#faq-mostly-unstyled">
						<a>mostly unstyled</a>
					</Link>
					{ /**/ }
					, some default styling is still used. If you&apos;re using webpack, it&apos;s as easy as:
				</p>
				<SyntaxHighlighter language="javascript">
					import &apos;react-aria-widgets/styles.css&apos;;
				</SyntaxHighlighter>
				<p>
					From here, you can simply import and use whichever components that you need.
				</p>
				<SyntaxHighlighter language="jsx">
					{ READY_TO_USE_EXAMPLE }
				</SyntaxHighlighter>
				<p id="base-components">
					The other flavor consists of what React ARIA Widgets calls &quot;base components&quot;. Unlike
					the &quot;ready-to-use&quot; components which may come with higher-order components (HOCs), hooks, or
					event management logic, these base components are simply thin wrappers over basic HTML elements
					and use PropTypes to dictate which HTML and ARIA attributes are necessary to satisfy the APG.
					For developers who wish to have finer control (or even write their own implementations) and
					are simply looking for &quot;guide rails&quot;, these base components may be more preferable to them.
				</p>
				<p>
					Documentation for each component, HOC, hook, etc. can be found
					under &quot;Patterns&quot; in the main navigation menu.
				</p>
				<p className="notification is-light is-info">
					Note: if you&apos;re using <a href="https://nextjs.org">Next.js</a>, the components
					may need to be <Link href="/support#next-js-lazy-load"><a>lazy loaded</a></Link>!
				</p>
			</article>
		</>
	);
}
