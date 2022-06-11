import dynamic from 'next/dynamic';

//Misc.
import {
	defaultAccordionExample,
	disableMultipleExample,
	disableToggleExample,
	CustomAccordionExample,
	StyledAccordionHeaderExample,
	StyledAccordionPanelExample,
	CustomAccordionHeaderExample,
	CustomAccordionPanelExample,
	customRenderFunctionExample,
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

const CustomAccordion = dynamic(
	() => import('./CustomAccordion'),
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
				The <code>&lt;Accordion&gt;</code> component uses the <code>withAccordionManager</code> HOC, which
				handles all of the stateful logic for an accordion. This HOC can be used independently of the
				other accordion components in React Aria Widgets, allowing developers to create their
				own accordion implementations.
			</p>
			<p>
				<code>&lt;Accordion&gt;</code> and <code>&lt;AccordionSection&gt;</code> provide
				some conveniences though, such as event handlers, uniform header
				levels, and consistent HTML IDs for each header/content combination.
				Additionally, <code>&lt;AccordionSection&gt;</code> accepts either React nodes or a
				render function as its children, and automatically passes down all of the props
				it receives (including props from <code>&lt;Accordion&gt;</code> and,
				by extension, <code>withAccordionManager</code>) to them. In other words,
				for developers who wish to use those components, but
				find <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code> to
				be insufficiently flexible, they can create their own accordion header/content section
				implementations.
			</p>
			<p>
				React Aria Widgets also provides
				the <code>&lt;BaseAccordionHeader&gt;</code> and <code>&lt;BaseAccordionPanel&gt;</code> components
				that can be used independently from the HOC or any of the other components. Unlike the non-base
				versions, these are unopinionated components that exist solely to simplify which HTML and
				ARIA attributes are needed to conform to the ARIA Authoring Practices.
			</p>
			<p>
				There are a few caveats to making custom implementations, though:
			</p>
			<ul>
				<li>
					When using <code>withAccordionManager</code>, any button that controls a
					particular accordion section must use the <code>setSectionRef()</code> callback
					ref. Otherwise, focus management will not work properly.
				</li>
				<li>
					If one wishes to use the keyboard and mouse event handlers provided
					by <code>&lt;Accordion&gt;</code>, the button that controls a particular accordion
					section must have an <code>id</code> attribute and a <code>data-index</code> attribute that
					corresponds to its <code>&lt;AccordionSection&gt;</code>.
				</li>
				<li>
					Be careful when using the spread operator and <code>headerProps</code> or <code>buttonProps</code> in
					<code>&lt;AccordionPanel&gt;</code> as one can easily overwrite which props should actually
					be passed down.
				</li>
				<li>
					If <code>&lt;BaseAccordionPanel&gt;</code> is given a prop that doesn't have an
					already-programmed use, it'll be spread onto the underlying element as an HTML attribute.
					This means that if a developer writes a wrapper over <code>&lt;BaseAccordionPanel&gt;</code> that's
					used in conjunction with <code>&lt;AccordionSection&gt;</code> (and, by
					extension, <code>&lt;Accordion&gt;</code> and <code>withAccordionManager()</code>), they must
					take care not to spread the props that <code>&lt;AccordionSection&gt;</code> automatically
					passes down.
				</li>
			</ul>
			{/*
			TODO: keep this in mind when proofreading the document?
			<p>
				Developers should be aware that there may be additional note-worthy details
				mentioned in the API documentation below.
			</p>
			*/}
			<h4>Styling</h4>
			<p>
				<code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code> can
				be styled simply by passing in props. For anyone who wishes to use any
				of the various customization options, React Aria Widgets ultimately places no
				restrictions on the underlying HTML (though we recommend taking care to adhere to the
				ARIA Authoring Practices!), meaning developers have complete control over how
				their accordions are styled.
			</p>
			<p>
				This also means developers are not tied to using <code>display: none;</code> to
				represent the collapsed state, which may or may not be desired. For more information
				on this, see the <a href="/support#faq-hidden-vs-display-none">FAQ</a>.
			</p>
			<CustomAccordion />
			<pre>
				{ CustomAccordionExample }
			</pre>
			<pre>
				{ StyledAccordionHeaderExample }
			</pre>
			<pre>
				{ StyledAccordionPanelExample }
			</pre>
			<pre>
				{ CustomAccordionHeaderExample }
			</pre>
			<pre>
				{ CustomAccordionPanelExample }
			</pre>
			<pre>
				{ customRenderFunctionExample }
			</pre>
			<p>
				This example shows four different ways of creating custom accordions.
			</p>
			<p>
				The first accordion section shows a simple way to add styling by passing in
				props to <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code>.
			</p>
			<p>
				The second accordion section shows how to add default styles
				to <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code> by
				using component composition. Note that we can't simply
				spread <code>props</code> onto <code>&lt;AccordionHeader&gt;</code> in <code>&lt;StyledAccordionHeader&gt;</code>.
				We have to make sure we only pass down the merged versions
				of <code>headerProps</code> and <code>buttonProps</code>. Otherwise, we would lose either
				the default styling or any of the props we may be passing down in those objects.
			</p>
			<p>
				Here, we don't have to worry about using <code>setSectionRef()</code>, adding
				the <code>id</code> and <code>data-index</code> attributes, or taking out props
				from <code>&lt;AccordionSection&gt;</code> because that's already being handled
				by <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code>.
			</p>
			<p>
				The third accordion section shows how to customize sections by composing
				over <code>&lt;BaseAccordionHeader&gt;</code> and <code>&lt;BaseAccordionPanel&gt;</code>.
				These components give developers greater control, but it means we have to manually
				set <code>setSectionRef()</code>, add the <code>id</code> and <code>data-index</code> attributes
				(because we're using the event handlers provided by <code>&lt;Accordion&gt;</code>), and pull out
				the props from <code>&lt;AccordionSection&gt;</code> that shouldn't be passed down
				to <code>&lt;BaseAccordionPanel&gt;</code>, while also being mindful of how we're passing
				down <code>headerProps</code> and <code>buttonProps</code> to <code>&lt;BaseAccordionHeader&gt;</code>.
			</p>
			<p>
				The fourth accordion section shows how to use a render function. The render function
				has access to the same props as the other examples, and it bypasses some of the above
				caveats by implementing its own event handlers and directly passing styles to the
				HTML elements. <code>setSectionRef()</code> still needs to be set, however, in order to
				use the methods provided by <code>withAccordionManager()</code>.
			</p>
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
						<th scope="col">Required</th>
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
							once they've been expanded. Note that even if the HOC
							received <code>false</code> as its <code>allowToggle</code> prop,
							if <code>allowMultiple</code> is <code>true</code>, child components will
							see <code>allowToggle</code> as <code>true</code> to reflect how the accordion
							will actually behave.
						</td>
					</tr>
				</tbody>
			</table>
			<h5>Methods</h5>
			<h6><code>focusSection(index: number): void</code></h6>
			<p>
				Sets the focus to an arbitrary accordion section's header button.
			</p>
			<h6><code>focusFirstSection(): void</code></h6>
			<p>
				Sets the focus to the first accordion section's header button.
			</p>
			<h6><code>focusLastSection(): void</code></h6>
			<p>
				Sets the focus to the last accordion section's header button.
			</p>
			<h6><code>focusNextSection(index: number): void</code></h6>
			<p>
				Sets the focus to the next (relative to <code>index</code>) accordion
				section's header button.
			</p>
			<h6><code>focusPrevSection(index: number): void</code></h6>
			<p>
				Sets the focus to the previous (relative to <code>index</code>) accordion
				section's header button.
			</p>
			<h6><code>getIsDisabled(id: string): boolean</code></h6>
			<p>
				Returns a boolean indicating if an accordion section cannot be
				interacted with. At the moment, an accordion section is only
				considered disabled if a section is expanded and <code>allowToggle</code> is <code>false</code>.
			</p>
			<h6><code>getIsExpanded(id: string): boolean</code></h6>
			<p>
				Returns a boolean indicating if an accordion section is
				collapsed or expanded.
			</p>
			<h6><code>setSectionRef(ref: Object): void</code></h6>
			<p>
				A React callback ref that must be used by each accordion header button in order to properly
				manage focus.
			</p>
			<h6><code>toggleSection(id: string): void</code></h6>
			<p>
				Expands/collapse a section of the accordion.
				Respects <code>allowMultiple</code> and <code>allowToggle</code>.
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
						<th scope="col">Required</th>
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
							(e.g. <code>&lt;h2&gt;</code>). By default, all of the headers in an accordion use
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
						<td>
							An integer from 1 - 6 (inclusive) representing which HTML section heading element
							to use for each accordion header.
						</td>
					</tr>
					<tr>
						<td><code>index</code></td>
						<td><code>number</code></td>
						<td>An integer representing an accordion header/panel pair's position in the accordion.</td>
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
			<p>
				If you wish to use this event handler with a custom accordion header, note that
				the button must have an <code>id</code> attribute corresponding to the ID
				of the accordion header/panel pair.
			</p>
			<h6><code>onTriggerKeyDown(event: SyntheticEvent&lt;&gt;): void</code></h6>
			<p>
				A premade event handler that can be attached to accordion header buttons to handle
				focus management. Implements the keyboard interactions described in
				the <a href="https://www.w3.org/TR/wai-aria-practices-1.2/#accordion">WAI-ARIA
				Authoring Practices 1.2</a> and is used by <code>&lt;AccordionHeader&gt;</code>.
			</p>
			<p>
				If you wish to use this event handler with a custom accordion header, note that
				the button must have a <code>data-index</code> attribute corresponding to the
				position of the accordion header/panel pair.
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
						<th scope="col">Required</th>
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
							<code>children</code> can either be a render function or a set of React nodes.
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
						<th scope="col">Required</th>
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
							</p>
							<p>
								See <a href="#base-accordion-header"><code>&lt;BaseAccordionHeader&gt;</code></a> for
								more information.
							</p>
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
								supply props and HTML attributes to it. For more information,
								see <a href="#base-accordion-header"><code>&lt;BaseAccordionHeader&gt;</code></a>.
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
								in order to supply props and HTML attributes to it. For more information,
								see <a href="#base-accordion-header"><code>&lt;BaseAccordionHeader&gt;</code></a>.
							</p>
						</td>
					</tr>
				</tbody>
			</table>
			<h5>Fields</h5>
			<p>
				It's worth noting that while <code>&lt;AccordionHeader&gt;</code> doesn't pass in
				any fields its children, it will automatically add pass in <code>buttonProps</code> to
				the underlying <code>&lt;BaseAccordionPanel&gt;</code> with a <code>'data-index'</code> property
				using the value generated by <code>&lt;Accordion&gt;</code>. This is because the default keyboard
				event handler, <code>onTriggerKeyDown()</code>, assumes the existence of this data attribute on
				the underlying <code>&lt;button&gt;</code> in order to determine the position of the accordion section.
			</p>
			<p>
				If <code>buttonProps</code> is passed to <code>&lt;AccordionHeader&gt;</code>, it will
				be merged with the automatically-generated version via <code>Object.assign()</code>.
			</p>
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
				<code>&lt;BaseAccordionPanel&gt;</code></a> for more information.
			</p>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required</th>
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
			<h4 id="base-accordion-header"><code>&lt;BaseAccordionHeader&gt;</code></h4>
			<p>
				<code>&lt;BaseAccordionHeader&gt;</code> is a thin, unopinionated wrapper over basic HTML elements
				designed to help implement accordions according to the WAI-ARIA Authoring Practices 1.2. It is
				the underlying component for <code>&lt;AccordionHeader&gt;</code> and can also be used for
				other accordion implementations.
			</p>
			<p>
				If a React ref is given, it will be forwarded to the underlying <code>&lt;button&gt;</code>.
			</p>
			<h5>Props</h5>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required</th>
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
								because <code>children</code> gets placed inside of
								a <code>&lt;button&gt;</code>, only certain HTML elements are permitted.
								Specifically, phrasing content that is not interactive.
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
						<td><code>id</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							<p>
								A unique identifier for the underlying <code>&lt;button&gt;</code>.
							</p>
							<p>
								Note that it's also recommended to give the accordion section's content
								an <code>aria-labelledby</code> attribute that points to this button (e.g. giving a
								corresponding <code>&lt;BaseAccordionPanel&gt;</code> a <code>labelId</code> prop
								with the same value).
							</p>
						</td>
					</tr>
					<tr>
						<td><code>controlsId</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							<p>
								A unique identifier pointing to the accordion section's content. Maps to
								the <code>aria-controls</code> attribute.
							</p>
							<p>
								This means that the accordion section content should have
								an <code>id</code> attribute with the same value (e.g. giving a
								corresponding <code>&lt;BaseAccordionPanel&gt;</code> an <code>id</code> prop).
							</p>
						</td>
					</tr>
					<tr>
						<td><code>headerLevel</code></td>
						<td><code>number</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							A number from 1-6 (inclusive) representing the HTML section heading elements
							(e.g. <code>&lt;h2&gt;</code>).
						</td>
					</tr>
					<tr>
						<td><code>onClick</code></td>
						<td><code>(SyntheticEvent&lt;T&gt;) => void</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							A click event handler for the underlying <code>&lt;button&gt;</code>. Should be used
							to handle expanding/collapsing the accordion section's content.
						</td>
					</tr>
					<tr>
						<td><code>onKeyDown</code></td>
						<td><code>(SyntheticEvent&lt;T&gt;) => void</code></td>
						<td><code>undefined</code></td>
						<td></td>
						<td>
							Primarily used to implement focus management.. Is considered optional by the
							WAI-ARIA Authoring Practices 1.2, and the mandatory interactions
							(<kbd>Enter</kbd>, <kbd>Space</kbd>, <kbd>Tab</kbd>, and <kbd>Shift + Tab</kbd>)
							should already be handled by the browser and by supplying an <code>onClick</code> prop.
						</td>
					</tr>
					<tr>
						<td><code>isExpanded</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td></td>
						<td>
							Used to set the <code>aria-expanded</code> attribute. Note that this attribute does not
							actually control whether or not the content is expanded or collapsed.
						</td>
					</tr>
					<tr>
						<td><code>isDisabled</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td></td>
						<td>
							<p>
								Used to set the <code>aria-disabled</code> attribute. Useful for communicating to
								assitive technologies situations where, e.g., there's an accordion that disallows
								toggling expand/collapse states and the current accordion section is already expanded.
							</p>
							<p>
								Note that unlike the HTML <code>disabled</code> attribute, even if an HTML
								element is given <code>aria-disabled="true"</code>, browsers will often still let
								interactions go through.
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
								An object that is spread over the underlying heading element in order to directly
								supply props and HTML attributes to it. For example, one can provide custom styling
								with:
							</p>
							<pre>
								<code>{ '<BaseAccordionHeader headerProps={{ className: \'custom-h2-class\' }} />' }</code>
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
								While this may provide greater flexibility, developers should take care to not
								overwrite attributes such as <code>aria-expanded</code> as they may be
								improperly set.
							</p>
						</td>
					</tr>
				</tbody>
			</table>
			<h4 id="base-accordion-panel"><code>&lt;BaseAccordionPanel&gt;</code></h4>
			<p>
				<code>&lt;BaseAccordionPanel&gt;</code> is a thin, unopinionated wrapper over basic HTML elements
				designed to help implement accordions according to the WAI-ARIA Authoring Practices 1.2. It is the
				underlying component for <code>&lt;AccordionPanel&gt;</code>, and can be used for
				other accordion implementations.
			</p>
			<h5>Props</h5>
			<p>
				This component accepts the following props, and any props not explicitly listed here
				will be spread onto the underlying HTML element.
			</p>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Default Value</th>
						<th scope="col">Required</th>
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
							A string, React component, etc., that represents the actual
							content for an accordion section.
						</td>
					</tr>
					<tr>
						<td><code>id</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713' }</td>
						<td>
							A unique identifier for the underlying HTML element. Note that the corresponding
							accordion header should also have an <code>aria-controls</code> attribute
							with the same value. This can be accomplished by passing in
							a <code>controlsId</code> prop to a <code>&lt;BaseAccordionHeader&gt;</code>.
						</td>
					</tr>
					<tr>
						<td><code>labelId</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>{ '\u2713 (see description)' }</td>
						<td>
							<p>
								A unique identifier for the accordion header that controls this element's
								visibility. Maps to the <code>aria-labelledby</code> attribute.
							</p>
							<p>
								Note that this prop is optional if the underlying HTML element
								does NOT have the <code>region</code> role. Because
								this component defaults to using the <code>&lt;section&gt;</code> element
								(which has the <code>region</code> role), this prop is required by default.
							</p>
							<p>
								See the <a href="https://w3c.github.io/aria/#region">
								<code>region</code> specification</a> for more information.
							</p>
						</td>
					</tr>
					<tr>
						<td><code>tagName</code></td>
						<td><code>string</code></td>
						<td><code>'section'</code></td>
						<td></td>
						<td>
							<p>
								A string representing what the underlying HTML element will be rendered as.
								Because this prop defaults to an element with the <code>region</code> role,
								the <code>labelId</code> is also required by default.
							</p>
							<p>
								However, the underlying HTML element does NOT need to have the
								role <code>region</code>. In fact, according to the WAI-ARIA
								Authoring Practices 1.2:
							</p>
							<blockquote cite="https://w3c.github.io/aria-practices/#accordion">
								Avoid using the <code>region</code> role in circumstances that create landmark
								region proliferation, e.g. in an accordion that contains more than approximately
								6 panels that can be expanded at the same time.
							</blockquote>
						</td>
					</tr>
				</tbody>
			</table>
			<h2>Notes</h2>
			<ul>
				<li>
					should booleans in base components be required? they're supposed to be controlled...
				</li>
				<li>
					instead of listing redundant props in accordion header/base accordion header (and panel),
					maybe list out everything in the base components, but specify which ones DON'T
					need to be passed if using the opinionated version?
				</li>
				<li>
					arrange props alphabetically?
				</li>
				<li>
					rename onTrigger* events to just on* ?
				</li>
				<li>
					should AccordionSection pass down ALL props? or just the
					ones it receives from Accordion/withAccordionManager?
				</li>
			</ul>
			<h2>Links</h2>
			<ul>
				<li>
					<a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">
						ARIA Authoring Practices Guide - Accordion
					</a>
				</li>
			</ul>
		</article>
	);
}
