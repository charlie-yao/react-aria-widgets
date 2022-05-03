import dynamic from 'next/dynamic';

//Misc.
import {
	defaultAccordionExample, disableMultipleExample, disableToggleExample,
	renderFunctionExample
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

const CustomRenderingAccordion = dynamic(
	() => import('./CustomRenderingAccordion'),
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
				in <code>&lt;AccordionSection&gt;</code>. <code>&lt;AccordionSection&gt;</code> will
				pass down every prop it receives to the rendering function.
			</p>
			<CustomRenderingAccordion />
			<pre>
				<code>{ renderFunctionExample }</code>
			</pre>
			<h2>API</h2>
			<h3>Higher-Order Components and Hooks</h3>
			<h4><code>withAccordionManager</code></h4>
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
			</ul>
		</article>
	);
}
