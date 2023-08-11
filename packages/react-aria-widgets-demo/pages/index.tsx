import Link from 'next/link';

//Components
import SyntaxHighlighter from '../components/SyntaxHighlighter';
import DefaultAccordion from '../components/accordion/DefaultAccordion';
import StyledAccordion from '../components/accordion/StyledAccordion';

//Misc.
import { DEFAULT_ACCORDION_EXAMPLE } from '../components/accordion/DefaultAccordion';
import { STYLED_ACCORDION_EXAMPLE, STYLED_ACCORDION_CLASSES_EXAMPLE } from '../components/accordion/StyledAccordion';

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
      <DefaultAccordion />
      <SyntaxHighlighter language="tsx">
        { DEFAULT_ACCORDION_EXAMPLE }
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
      <StyledAccordion />
      <SyntaxHighlighter language="tsx">
        { STYLED_ACCORDION_EXAMPLE }
      </SyntaxHighlighter>
      <SyntaxHighlighter language="scss">
        { STYLED_ACCORDION_CLASSES_EXAMPLE }
      </SyntaxHighlighter>
      <p>
        In addition to styling options React ARIA Widgets also provides a number of hooks and other primitives
        for each pattern that can be used to build finer-tuned implementations. For more information, see each
        patterns' individual documentation page.
      </p>
    </article>
  );
}
