import Head from 'next/head';

//Components
import SyntaxHighlighter from '../../components/SyntaxHighlighter';

/* eslint-disable operator-linebreak */
const NEXT_EXAMPLE_FAQ_PAGE =
`//In a hypothetical pages/faq/index.js
import dynamic from 'next/dynamic';

const FAQAccordion = dynamic(
	() => import('../../components/FAQAccordion'),
	{
		ssr: false,
		loading: () => <p>Loading, please wait...</p>,
	},
);

export default function FAQPage() {
	return (
		<>
			<h1>Frequently Asked Questions</h1>
			<FAQAccordion />
		</>
	);
}`;

const NEXT_EXAMPLE_FAQ_ACCORDION =
`//In a hypothetical components/FAQAccordion.js
import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function FAQAccordion () {
	return (
		<Accordion headerlevel={ 2 }>
			<AccordionSection id="faq-1">
				<AccordionHeader>
					How do I "foo"?
				</AccordionHeader>
				<AccordionPanel>
					Great question!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="faq-2">
				<AccordionHeader>
					How do I "bar"?
				</AccordionHeader>
				<AccordionPanel>
					Hard to say!	
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`;
/* eslint-enable operator-linebreak */

export default function SupportPage() {
	return (
		<>
			<Head>
				<title>Support - React ARIA Widgets</title>
			</Head>
			<article className="container is-max-desktop content">
				<h1>Support</h1>
				<p>
					If you encounter any issues, please feel free to make an issue
					on <a href="https://github.com/charlie-yao/react-aria-widgets">GitHub</a>.
				</p>
				<p className="notification is-info is-light">
					Please note that this library should <strong>NOT</strong> be used in a production environment!
					It was developed primarily for educational purposes, and longterm
					support in the form of additional features, bug fixes, maintenance, or etc.
					cannot be guaranteed!
				</p>
				<h2>Frequently Asked Questions (FAQ)</h2>
				<h3 id="faq-mostly-unstyled">
					&quot;Mostly Unstyled&quot;?
				</h3>
				<p>
					The components provided by React ARIA Widgets strives to be as unstyled as possible,
					but there are cases where styling is included by default. For example, the accordion widget
					uses <code>display: none !important;</code> by default to handle the expand/collapse states.
					However, whenever possible, React ARIA Widgets will try to provide customization options
					so that developers can use the implementation that suits them best.
				</p>
				<p>
					Note that the examples shown for each pattern may contain styling that differs
					from your browser&apos;s default styling, but that&apos;s due to the CSS used by this
					website rather than React ARIA Widgets itself.
				</p>
				<h3 id="faq-hidden-vs-display-none">
					<code>hidden</code> versus <code>display: none;</code>
				</h3>
				<p>
					At the time of writing, many of the example implementations of widgets such as tabs shown in ARIA
					Authoring Practices Guide (APG) use the <code>hidden</code> HTML attribute to handle expand/collapse states.
					However, in the
					{ ' ' }
					<a href="https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute">
						living WHATWG HTML standard
					</a>
					{ /**/ }
					, they say:
				</p>
				<blockquote cite="https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute">
					<p>
						The <code>hidden</code> attribute must not be used to hide content that could legitimately
						be shown in another presentation. For example, it is incorrect to use <code>hidden</code> to
						hide panels in a tabbed dialog, because the tabbed interface is merely a kind of overflow
						presentation — one could equally well just show all the form controls in one big page with a
						scrollbar. It is similarly incorrect to use this attribute to hide content just from one
						presentation — if something is marked <code>hidden</code>, it is hidden from all presentations,
						including, for instance, screen readers.
					</p>
				</blockquote>
				<p>
					In this <a href="https://github.com/whatwg/html/issues/4904">GitHub thread</a>, it&apos;s argued that
					the APG examples are using tabs as a presentational choice rather than to convey semantics,
					and that <code>display: none;</code> should be used rather than <code>hidden</code>. Though
					the APG examples that are currently live still do not reflect those changes, their source
					code has been changed to use <code>display: none;</code> rather than <code>hidden</code>.
				</p>
				<p>
					React ARIA Widgets will use <code>display: none important!;</code> by default, but whenever possible,
					it will try to give developers customization options should they decide to
					use the <code>hidden</code> attribute or custom styling.
				</p>
				<h3>Styles from React ARIA Widgets Are Not Appearing</h3>
				<p>
					Remember to import the stylesheet!
				</p>
				<SyntaxHighlighter language="javascript">
					import &apos;react-aria-widgets/styles.css&apos;;
				</SyntaxHighlighter>
				<h3>Type Notation in the API</h3>
				<p>
					<a href="https://flow.org/">Flow</a> is used notate types in the API, though
					the project itself doesn&apos;t use Flow internally.
				</p>
				<h3 id="next-js-lazy-load">Next.js and <code>ReferenceError: self is not defined</code></h3>
				<p>
					This error occurs when Next.js pre-renders a page (whether using static generation or
					server-side rendering) seemingly because React ARIA Widgets is trying to execute
					code that only exists on clients (i.e. browsers).
				</p>
				<p>
					To get around this on a pre-rendered page, you can lazy load React ARIA Widgets with
					{ ' ' }
					<a href="https://nextjs.org/docs/advanced-features/dynamic-import">
						<code>next/dynamic</code>
					</a>
					{ /**/ }
					. For example:
				</p>
				<SyntaxHighlighter language="jsx">
					{ NEXT_EXAMPLE_FAQ_PAGE }
				</SyntaxHighlighter>
				<SyntaxHighlighter language="jsx">
					{ NEXT_EXAMPLE_FAQ_ACCORDION }
				</SyntaxHighlighter>
			</article>
		</>
	);
}
