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
				the <a href="/accordion#accordion-api">API section</a> below.
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
			<h2 id="accordion-api">API</h2>
			<h3>Higher-Order Components and Hooks</h3>
			<h4><code>withAccordionManager</code></h4>
			<p>
				<code>withAccordionManager</code> is a HOC that manages the underlying state for an accordion. It
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
						<td>Boolean</td>
						<td><code>true</code></td>
						<td></td>
						<td>Controls whether or not multiple sections can be expanded at the same time.</td>
					</tr>
					<tr>
						<td><code>allowToggle</code></td>
						<td>Boolean</td>
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
						<td>Boolean</td>
						<td>
							Lets child components know whether or not multiple sections can be
							expanded simultaneously.
						</td>
					</tr>
					<tr>
						<td><code>allowToggle</code></td>
						<td>Boolean</td>
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
			<h6><code>getIsExpanded(id: number):</code></h6>
			<table>
				<thead>
				</thead>
				<tbody>
				</tbody>
			</table>
			<h3>Components</h3>
			<h4><code>&lt;Accordion&gt;</code></h4>
			<h4><code>&lt;AccordionSection&gt;</code></h4>
			<h4><code>&lt;AccordionHeader&gt;</code></h4>
			<h4><code>&lt;AccordionPanel&gt;</code></h4>
			<h3>Base Components</h3>
			<h4><code>&lt;BaseAccordionHeader&gt;</code></h4>
			<h4><code>&lt;BaseAccordionPanel&gt;</code></h4>
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
