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
			<h3 id="faq-mostly-unstyled">
				"Mostly Unstyled"?
			</h3>
			<p>
				The components provided by React Aria Widgets strives to be as unstyled as possible,
				but there are cases where styling is included by default. For example, the accordion widget
				uses <code>display: none !important;</code> by default to handle the expand/collapse states.
				However, whenever possible, React Aria Widgets will try to provide access to the underlying
				state so that developers can use the implementation that suits them best.
			</p>
			<h3 id="faq-hidden-vs-display-none">
				<code>hidden</code> versus <code>display: none;</code>
			</h3>
			<p>
				At the time of writing, many of the example implementations of widgets such as tabs shown in WAI-Aria
				Authoring Practices 1.2 use the <code>hidden</code> HTML attribute to handle expand/collapse states.
				However, in the <a href="https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute">
				living WHATWG HTML standard</a>, they say:
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
				In this <a href="https://github.com/whatwg/html/issues/4904">GitHub thread</a>, it's argued that
				the WAI-ARIA examples are using tabs as a presentational choice rather than to convey semantics,
				and that <code>display: none;</code> should be used rather than <code>hidden</code>. Though
				the WAI-ARIA examples that are currently live still do not reflect those changes, their source
				code has been changed to use <code>display: none;</code> rather than <code>hidden</code>.
			</p>
			<p>
				React Aria Widgets will use <code>display: none;</code> by default, but whenever possible it
				will also give developers access to the underlying state should they decide to use <code>hidden
				</code>, custom <code>display: none;</code> styling, or something else entirely.
			</p>
		</article>
	);
}