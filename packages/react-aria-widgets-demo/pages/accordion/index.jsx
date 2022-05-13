import dynamic from 'next/dynamic';

//Misc.
import {
	defaultAccordionExample, disableMultipleExample, disableToggleExample,
	renderFunctionExampleOne, renderFunctionExampleTwo
} from './examples';

const DefaultAccordion = dynamic(
	() => import('./DefaultAccordion'),
	{
		ssr: false,
		loading: () => <p>Loading, please wait...</p>,
	},
);

const DisableMultipleAccordion = dynamic(
	() => import('./DisableMultipleAccordion'),
	{
		ssr: false,
		loading: () => <p>Loading, please wait...</p>,
	},
);

const DisableToggleAccordion = dynamic(
	() => import('./DisableToggleAccordion'),
	{
		ssr: false,
		loading: () => <p>Loading, please wait...</p>,
	},
);

const RenderFunctionAccordionOne = dynamic(
	() => import('./RenderFunctionAccordionOne'),
	{
		ssr: false,
		loading: () => <p>Loading, please wait...</p>,
	},
);

const RenderFunctionAccordionTwo = dynamic(
	() => import('./RenderFunctionAccordionTwo'),
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
				An accordion is a collection of vertically-stacked content where each section has a heading
				and the content itself. The heading is used to control the visibility of the content.
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
			<pre>
				<code>{ defaultAccordionExample }</code>
			</pre>
			<h3><code>allowMultiple</code> and <code>allowToggle</code></h3>
			<p>
				By default, multiple sections can be expanded and closed at the same time. One can use
				the <code>allowMultiple</code> prop to toggle whether or not multiple sections can be
				opened at the same time. The <code>allowToggle</code> prop can also be used to toggle
				whether or not a section can be collapsed once it's expanded.
			</p>
			<p>
				Note that if <code>allowMultiple</code> is <code>true</code>, then
				the <code>allowToggle</code> will always be <code>true</code>. Otherwise, users could
				run into a situation where there are many open sections that can't be closed.
			</p>
			<h4>Disabling <code>allowMultiple</code></h4>
			<DisableMultipleAccordion />
			<pre>
				<code>{ disableMultipleExample }</code>
			</pre>
			<h4>Disabling <code>allowToggle</code></h4>
			<DisableToggleAccordion />
			<pre>
				<code>{ disableToggleExample }</code>
			</pre>
			<h3>Customization</h3>
			<p>
				Instead of using <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code>,
				a rendering function can be used as the <code>children</code> prop
				in <code>&lt;AccordionSection&gt;</code>. The rendering function provides access to
				the underlying fields and methods that manage the accordion's state and allows
				for custom rendering.
			</p>
			<p>
				Note that the button that controls the accordion section must use the callback
				ref <code>setSectionRef()</code>. Otherwise, focus management will not work properly.
			</p>
			<p>
				For the full list of props that the rendering function has access to, see below.
			</p>
			<RenderFunctionAccordionOne />
			<pre>
				<code>{ renderFunctionExampleOne }</code>
			</pre>
			<p>
				In addition to the actual methods that manipulate the underlying state, the render function
				also receives event handlers that already implement the mouse and keyboard behaviors. In you wish to
				use these event handlers, the button must also have an <code>id</code> attribute and
				a <code>data-index</code> attribute that corresponds to the <code>id</code> and <code>index</code> props
				provided to the render function.
			</p>
			<p>
				(In the previous example, giving the button an <code>id</code> attribute isn't a strict
				necessity for expanding/collapsing the content, but it was added because the
				WAI-ARIA Authoring Practices 1.2 recommends it so that the content can have
				an <code>aria-labelledby</code> attribute that points to the button.)
			</p>
			<RenderFunctionAccordionTwo />
			<pre>
				<code>{ renderFunctionExampleTwo }</code>
			</pre>
			<h4>Styling</h4>
			<h2>API</h2>
			<h3>Higher-Order Components and Hooks</h3>
			<h4><code>withAccordionManager()</code></h4>
			<p>
				<code>withAccordionManager()</code> is a HOC that manages the underlying state for an accordion. It
				controls which sections are expanded/collapsed, which sections can/cannot be interacted with, and
				manages focus for keyboard users.
			</p>
			<h5>Props</h5>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required?</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>allowMultiple</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td></td>
						<td>Controls whether or not multiple sections can be expanded at the same time.</td>
					</tr>
					<tr>
						<td><code>allowToggle</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td></td>
						<td>
							Controls whether or not a section can be collapsed after it has been expanded. Note
							that if <code>allowMultiple</code> is <code>true</code>, then sections will always
							be collapsible even if <code>allowToggle</code> is <code>false</code>. This
							is to prevent situations where there would otherwise be multiple expanded sections
							that can't be collapsed.
						</td>
					</tr>
				</tbody>
			</table>
			<h5>Fields</h5>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>allowMultiple</code></td>
						<td><code>boolean</code></td>
						<td>
							Lets child components know whether or not multiple sections can be
							expanded simultaneously.
						</td>
					</tr>
					<tr>
						<td><code>allowToggle</code></td>
						<td><code>boolean</code></td>
						<td>
							Lets child components know whether or not sections can be collapsed
							once they've been expanded. Unlike with <code>allowMultiple</code>, the HOC does
							not simply pass down the value it received for <code>allowToggle</code>. Even if it
							received <code>false</code> as its <code>allowToggle</code> prop,
							if <code>allowMultiple</code> is <code>true</code>, child components will
							see <code>allowToggle</code> as <code>true</code> to reflect how the accordion
							will actually behave.
						</td>
					</tr>
				</tbody>
			</table>
			<h5>Methods</h5>
			<h6><code>getIsExpanded(id: string): boolean</code></h6>
			<p>
				Returns a boolean indicating if an accordion section is
				collapsed or expanded.
			</p>
			<h6><code>getIsDisabled(id: string): boolean</code></h6>
			<p>
				Returns a boolean indicating if an accordion section cannot be
				interacted with. At the moment, an accordion section is only
				considered disabled if a section is expanded and <code>allowToggle</code> is <code>false</code>.
			</p>
			<h6><code>toggleSection(id: string): void</code></h6>
			<p>
				Expands/collapse a section of the accordion. Respects
				the <code>allowMultiple</code> and <code>allowToggle</code> props.
			</p>
			<h6><code>focusSection(index: number): void</code></h6>
			<p>
				Sets the focus to an arbitrary accordion section's header button.
			</p>
			<h6><code>focusPrevSection(index: number): void</code></h6>
			<p>
				Sets the focus to the previous (relative to <code>index</code>) accordion
				section's header button.
			</p>
			<h6><code>focusNextSection(index: number): void</code></h6>
			<p>
				Sets the focus to the next (relative to <code>index</code>) accordion
				section's header button.
			</p>
			<h6><code>focusFirstSection(): void</code></h6>
			<p>
				Sets the focus to the first accordion section's header button.
			</p>
			<h6><code>focusLastSection(): void</code></h6>
			<p>
				Sets the focus to the last accordion section's header button.
			</p>
			<h6><code>setSectionRef(ref: Object): void</code></h6>
			<p>
				A React callback ref that must be used by each accordion header button in order to properly
				manage focus.
			</p>
			<h3>Components</h3>
			<h4><code>&lt;Accordion&gt;</code></h4>
			<p>
				<code>&lt;Accordion&gt;</code>s use the <code>withAccordionManager()</code> HOC and
				wrap around <code>&lt;AccordionSection&gt;</code>s. They also forward the props
				they receive from <code>withAccordionManager()</code> to their children.
			</p>
			<p>
				<code>&lt;Accordion&gt;</code>s only accept <code>&lt;AccordionSection&gt;</code> as children.
				Anything else will throw an error.
			</p>
			<h5>Props</h5>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required?</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>children</code></td>
						<td><code>React.ChildrenArray&lt;React.Element&lt;typeof AccordionSection&gt;&gt;</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							A set of one or more <code>&lt;AccordionSection&gt;</code>s. An error will be thrown
							if there are any React nodes that are not an <code>&lt;AccordionSection&gt;</code>.
						</td>
					</tr>
					<tr>
						<td><code>headerLevel</code></td>
						<td><code>number</code></td>
						<td><code>2</code></td>
						<td></td>
						<td>
							An integer from 1 to 6 (inclusive) representing the HTML section heading elements
							(e.g. <code>&lt;h1&gt;</code>). By default, all of the headers in an accordion use
							the same level.
						</td>
					</tr>
				</tbody>
			</table>
			<h5>Fields</h5>
			<p>
				In addition to the fields from <code>withAccordionManager()</code>,
				an <code>&lt;Accordion&gt;</code> will pass down the following to its children:
			</p>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>headerLevel</code></td>
						<td><code>number</code></td>
						<td>An integer from 1 - 6 (inclusive) representing the HTML section heading elements.</td>
					</tr>
					<tr>
						<td><code>index</code></td>
						<td><code>number</code></td>
						<td>An integer representing the position of a section in an accordion.</td>
					</tr>
				</tbody>
			</table>
			<h5>Methods</h5>
			<p>
				In addition to the methods from <code>withAccordionManager()</code>,
				an <code>&lt;Accordion&gt;</code> will pass down the following to its children:
			</p>
			<h6><code>onTriggerClick(event: SyntheticEvent&lt;&gt;): void</code></h6>
			<p>
				A premade event handler that can be attached to accordion header buttons
				to handle expanding/collapsing a particular section. Used by <code>&lt;AccordionHeader&gt;</code>.
			</p>
			<h6><code>onTriggerKeyDown(event: SyntheticEvent&lt;&gt;): void</code></h6>
			<p>
				A premade event handler that can be attached to accordion header buttons to handle
				focus management. Implements the keyboard interactions described in
				the <a href="https://www.w3.org/TR/wai-aria-practices-1.2/#accordion">WAI-ARIA
				Authoring Practices 1.2</a> and is used by <code>&lt;AccordionHeader&gt;</code>.
			</p>
			<h4><code>&lt;AccordionSection&gt;</code></h4>
			<p>
				Represents a section of an accordion consisting of a header and the section's content. Wraps around
				either a set of React nodes or a render function. Will automatically pass down the props it
				receives from <code>withAccordionManager()</code> and <code>&lt;Accordion&gt;</code> to
				its children.
			</p>
			<h5>Props</h5>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required?</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>children</code></td>
						<td><code>(props: Object): React.Node | React.ChildrenArray&lt;T&gt;</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							<code>children</code> can either be a rendering function or a set of React nodes.
							In addition to the <code>id</code> prop, <code>&lt;AccordionSection&gt;</code> also
							passes down all of the props it receives from <code>&lt;Accordion&gt;</code>, including
							props that actually originate from <code>withAccordionManager()</code>.
						</td>
					</tr>
					<tr>
						<td><code>id</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							An identifier for the accordion section. Must be unique to the whole document as
							it's used as the HTML <code>id</code> on the header button and
							an <code>aria-labelledby</code> pointing to it. Also
							used to generate an HTML <code>id</code> for the section's content and
							an <code>aria-controls</code> pointing to it.
						</td>
					</tr>
				</tbody>
			</table>
			<h5>Fields</h5>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>id</code></td>
						<td><code>string</code></td>
						<td>A unique identifier for the header and content.</td>
					</tr>
				</tbody>
			</table>
			<h4><code>&lt;AccordionHeader&gt;</code></h4>
			<p>
				An <code>&lt;AccordionHeader&gt;</code> is an thin, opinionated wrapper
				over <code>&lt;BaseAccordionHeader&gt;</code> (which is itself just a
				wrapper over basic HTML elements) that is designed to be used
				with <code>&lt;Accordion&gt;</code> and <code>&lt;AccordionSection&gt;</code>.
				Because <code>&lt;AccordionHeader&gt;</code> isn't meant to be used in a standalone manner,
				if you wish to write your own accordion implementation or you require
				finer controls, <code>&lt;BaseAccordionHeader&gt;</code> may be a more suitable option.
			</p>
			<h5>Props</h5>
			<p>
				<code>&lt;AccordionHeader&gt;</code> expects, and automatically gets passed, certain props
				from <code>&lt;Accordion&gt;</code> and <code>&lt;AccordionSection&gt;</code> such
				as <code>headerLevel</code> and <code>setSectionRef()</code>. It can also receive
				the following props:
			</p>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required?</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>children</code></td>
						<td><code>React.Node</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							<p>
								<code>children</code> can be anything renderable by React. However,
								because <code>children</code> ultimately gets placed inside of
								a <code>&lt;button&gt;</code>, only certain HTML elements are permitted.
								Namely, phrasing content that is not interactive.
							</p>
							<p>
								Though this may seem like a minor detail, it has some accessibility
								implications such as potentially failing to
								meet <a href="https://www.w3.org/TR/WCAG22/#parsing">
								Success Criterion 4.4.1</a> of the WCAG 2.2 guidelines.
							</p>
							<p>
								See the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">
								MDN Web Docs</a> for more information.
							</p>
						</td>
					</tr>
					<tr>
						<td><code>headerProps</code></td>
						<td><code>{ '{ [key: string]: any }' }</code></td>
						<td><code>{ '{}' }</code></td>
						<td></td>
						<td>
							<p>
								An object that is spread over the underlying HTML section heading element
								in order to supply props and HTML attributes to it. For example, one can provide
								a custom CSS class with:
							</p>
							<pre>
								<code>{ '<AccordionHeader headerProps={{ className: \'custom-h1-class\' }} />' }</code>
							</pre>
						</td>
					</tr>
					<tr>
						<td><code>buttonProps</code></td>
						<td><code>{ '{ [key: string]: any }' }</code></td>
						<td><code>{ '{}' }</code></td>
						<td></td>
						<td>
							<p>
								An object that is spread over the underlying <code>&lt;button&gt;</code> in order to
								supply props and HTML attributes to it. Note that because it is spread after other
								props are applied to the <code>&lt;button&gt;</code>, fields
								in <code>buttonProps</code> can overwrite those props.
							</p>
							<p>
								For example, <code>&lt;AccordionHeader&gt;</code> uses <code>onTriggerClick()</code> from <code>
								&lt;Accordion&gt;</code> as the default click event handler. However,
								if <code>buttonProps</code> is given its own <code>onClick</code> property,
								the underlying <code>&lt;button&gt;</code> will use that instead.
							</p>
							<p>
								While this can provide greater flexibility, developers should take care to not
								overwrite attributes such as <code>aria-expanded</code> as they may be
								improperly set.
							</p>
							<p>
								Note that by default, <code>&lt;AccordionHeader&gt;</code> will automatically
								add the property <code>'data-index'</code> to <code>buttonProps</code> using
								the index generated by <code>&lt;Accordion&gt;</code>. This is because
								the default keyboard event handler, <code>onTriggerKeyDown()</code>, assumes
								the existence of this data attribute on the <code>&lt;button&gt;</code> in order
								to determine the position of the accordion section.
							</p>
						</td>
					</tr>
				</tbody>
			</table>
			<h4><code>&lt;AccordionPanel&gt;</code></h4>
			<p>
				An <code>&lt;AccordionPanel&gt;</code> is a thin, opinionated wrapper
				over <code>&lt;BaseAccordionPanel&gt;</code> (which is itself just a
				wrapper over basic HTML elements) that is designed to be used
				with <code>&lt;Accordion&gt;</code> and <code>&lt;AccordionSection&gt;</code>.
			</p>
			<p>
				By default, this component uses a CSS class with <code>display: none;</code> to represent
				the collapsed state, which may or may not be desired. For more information, see
				the <a href="/support#faq-hidden-vs-display-none">FAQ</a>.
			</p>
			<h5>Props</h5>
			<p>
				<code>&lt;AccordionPanel&gt;</code> expects, and automatically gets passed, certain props
				from <code>&lt;Accordion&gt;</code> and <code>&lt;AccordionHeader&gt;</code> such
				as <code>id</code>. The following props are also accepted, and any props not listed are
				automatically spread onto the underlying <code>&lt;BaseAccordionPanel&gt;</code>.
			</p>
			<p>
				Note that the underlying HTML element that contains the actual content of the
				accordion section defaults to <code>&lt;section&gt;</code>. This can be changed by
				passing in a <code>tagName</code> prop. See <a href="#base-accordion-panel">
				<code>&lt;BaseAccordionPanel&gt;</code></a> below.
			</p>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required?</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>children</code></td>
						<td><code>React.Node</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							A string, React component, etc. that represents the actual
							content for this accordion section.
						</td>
					</tr>
					<tr>
						<td><code>className</code></td>
						<td><code>string</code></td>
						<td><code>''</code></td>
						<td></td>
						<td>
							A string representing a CSS class. If this section is collapsed, the
							class <code>"react-aria-widgets-hidden"</code> will be automatically
							concatenated.
						</td>
					</tr>
				</tbody>
			</table>
			<h3>Base Components</h3>
			<h4><code>&lt;BaseAccordionHeader&gt;</code></h4>
			<h4 id="base-accordion-panel"><code>&lt;BaseAccordionPanel&gt;</code></h4>
			<h2>Keyboard Support</h2>
			<h2>Notes</h2>
			<ul>
				<li>mention using <code>&lt;section&gt;</code> versus <code>&lt;div&gt;</code></li>
				<li>where to put render function documentation? in usage and examples? in accordion section?</li>
				<li>
					expand upon this in "Building Your Own Accordion"? E.g., explain that id and
					index are needed to identify things, document which props are being passed down
					(possibly useful for custom focus handling instead of using the premade events?)
				</li>
				<li>
					<a href="https://www.w3.org/TR/wai-aria-practices-1.2/#accordion">WAI-Aria Authoring Practices 1.2 Accordion Specifications</a>
				</li>
			</ul>
		</article>
	);
}
