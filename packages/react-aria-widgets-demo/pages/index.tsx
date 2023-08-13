//Components
import SyntaxHighlighter from '../components/SyntaxHighlighter';
import { UnstyledBasicAccordion } from '../components/accordion/BasicAccordion';
import StyledAccordion from '../components/accordion/StyledAccordion';

const UNSTYLED_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default BasicAccordion() {
  return (
    <Accordion headerLevel={ 3 }>
      <AccordionItem id="item1">
        <AccordionHeader>
          Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          Hello world!
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel>
          Hello world!
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel>
          Hello world!
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}`;

const STYLED_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

export default function StyledAccordion() {
  return (
    <Accordion headerLevel={ 3 }>
      <AccordionItem id="item1">
        <AccordionHeader>
          Styled Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          This accordion item is styled by CSS that targets the default classes provided by React ARIA
          Widgets. Since React ARIA Widgets also exposes the accordion's state via HTML data attributes,
          we can use selectors such as <code>[data-expanded]</code> or <code>[data-disabled]</code>.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Styled Accordion Item 2
        </AccordionHeader>
        <AccordionPanel className="custom-accordion-panel">
          This accordion item is styled by passing in a string <code>className</code> prop and CSS
          targeting the state exposed by React ARIA Widgets.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Styled Accordion Item 3
        </AccordionHeader>
        <AccordionPanel style={ ({ isExpanded }) => isExpanded ? {} : { display: 'none'} }>
          This accordion item is styled by passing in a function <code>style</code> prop that behaves
          similarly to the commonly-used render function pattern.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}`;

export const STYLED_ACCORDION_CSS_EXAMPLE =
`.react-aria-widgets-accordion-panel[data-expanded=false] {
  display: none;
}

.custom-accordion-panel[data-expanded=false] {
  display: none;
}`;

export default function HomePage() {
  return (
    <article className="container is-max-desktop content">
      <h1>React ARIA Widgets</h1>
      <p>
        React ARIA Widgets is a collection of React primitives designed
        to help developers implement the patterns found in
        the <a href="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices Guide (APG)</a>.
      </p>
      <p className="notification is-light is-info">
        Please note that this library should <strong>NOT</strong> be used in a production environment! It's
        still in a pre-alpha stage and the API is subject to major breaking changes.
      </p>
      <h2>Features</h2>
      <ul>
        <li>
          Unstyled, accessible components that are easily composable and customizable
        </li>
        <li>
          Reusable hooks that can be used by developers who require finer-tuned control
        </li>
        <li>
          Adheres to the APG complete with focus control and full keyboard support.
        </li>
      </ul>
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
      <p>Please note that, at the moment, React ARIA Widgets only supports React v18.</p>
      <h2>Usage</h2>
      <p>
        React ARIA Widgets provides building blocks for developers to implement their own component libraries.
        Though it provides features such as accessibility and state management, that alone is insufficient
        for it to be used out of the box. For example, React ARIA Widgets provides <strong>no</strong> default
        styling in order to maximize compatibility with the variety of CSS options out there.
      </p>
      <p>
        But, since React ARIA Widgets already provides implementations for the APG patterns, simply passing
        in your own styles will likely be enough to begin creating your own components.
      </p>
      <UnstyledBasicAccordion headerLevel={ 3 } />
      <SyntaxHighlighter language="tsx">
        { UNSTYLED_ACCORDION_EXAMPLE }
      </SyntaxHighlighter>
      <p>
        If you open your browser's developer tools and you click on the buttons, you'll see that the accordion
        will set the HTML and ARIA attributes correctly. However, other than the default styles that come from your
        browser and this website's CSS framework, the accordion is completely unstyled, including any styles that
        should handle collapsing an accordion item when toggled.
      </p>
      <p>
        React ARIA Widgets aims to be as flexible as possible, and a few different styling options are
        displayed in the following example:
      </p>
      <StyledAccordion headerLevel={ 3 } />
      <SyntaxHighlighter language="tsx">
        { STYLED_ACCORDION_EXAMPLE }
      </SyntaxHighlighter>
      <SyntaxHighlighter language="scss">
        { STYLED_ACCORDION_CSS_EXAMPLE }
      </SyntaxHighlighter>
      <p>
        In addition to styling options React ARIA Widgets also provides a number of hooks and other primitives
        for each pattern that can be used to build finer-tuned implementations. For more information, see each
        patterns' individual documentation page.
      </p>
    </article>
  );
}
