import dynamic from 'next/dynamic';

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
				<code>{
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function DefaultAccordion() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="default-section1">
				<AccordionHeader>
					DefaultAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="default-section2">
				<AccordionHeader>
					DefaultAccordion - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="default-section3">
				<AccordionHeader>
					DefaultAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`
				}</code>
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
				<code>{
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function DisableMultipleAccordion() {
	return (
		<Accordion headerLevel={ 5 } allowMultiple={ false }>
			<AccordionSection id="disable-multiple-section1">
				<AccordionHeader>
					DisableMultipleAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-multiple-section2">
				<AccordionHeader>
					DisableMultipleAccordion - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-multiple-section3">
				<AccordionHeader>
					DisableMultipleAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`
				}</code>
			</pre>
			<h4>Disabling <code>allowToggle</code></h4>
			<DisableToggleAccordion />
			<pre>
				<code>{
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function DisableToggleAccordion() {
	return (
		<Accordion headerLevel={ 5 } allowMultiple={ false } allowToggle={ false }>
			<AccordionSection id="disable-toggle-section1">
				<AccordionHeader>
					DisableToggleAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-toggle-section2">
				<AccordionHeader>
					DisableToggleAccordion - Section 2
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="disable-toggle-section3">
				<AccordionHeader>
					DisableToggleAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`
				}</code>
			</pre>
			<h3>Custom Rendering</h3>
			<p>
				Instead of <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code>,
				a rendering function can be used as the <code>children</code> prop
				in <code>&lt;AccordionSection&gt;</code>. <code>&lt;AccordionSection&gt;</code> will
				pass down every prop it receives to the rendering function.
			</p>
			<p>
				<strong>Note to Charlie: expand upon this in "Building Your Own Accordion"?</strong> E.g.,
				explain that id and index are needed to identify things, document which props are being
				passed down (possibly useful for custom focus handling instead of using the premade events?)
			</p>
			<CustomRenderingAccordion />
			<pre>
				<code>{
`import { Accordion, AccordionSection, AccordionHeader, AccordionPanel } from '@charlie-yao/react-aria-widgets/accordion';

export default function CustomRenderingAccordion() {
	return (
		<Accordion headerLevel={ 4 }>
			<AccordionSection id="custom-rendering-section1">
				<AccordionHeader>
					CustomRenderingAccordion - Section 1
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="custom-rendering-section2">
				{
					(args) => {
						const {
							id, index, headerLevel, getIsExpanded, getIsDisabled,
							setSectionRef, onTriggerClick, onTriggerKeyDown,
						} = args;
						const isExpanded = getIsExpanded(id);
						const isDisabled = getIsDisabled(id);

						return (
							<>
								<AccordionHeader
									id={ id }
									index={ index }
									headerLevel={ headerLevel }
									isExpanded={ isExpanded }
									isDisabled={ isDisabled }
									setSectionRef={ setSectionRef }
									onTriggerClick={ onTriggerClick }
									onTriggerKeyDown={ onTriggerKeyDown }
								>
									CustomRenderingAccordion - Section 2
								</AccordionHeader>
								<AccordionPanel id={ id } isExpanded={ isExpanded }>
									Hello world!
								</AccordionPanel>
							</>
						);
					}
				}
			</AccordionSection>
			<AccordionSection id="custom-rendering-section3">
				<AccordionHeader>
					CustomRenderingAccordion - Section 3
				</AccordionHeader>
				<AccordionPanel>
					Hello world!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}`
				}</code>
			</pre>
			<h2>Building Your Own Accordion</h2>
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
			</ul>
		</article>
	);
}
