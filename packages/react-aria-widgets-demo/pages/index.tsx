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

function StyledAccordion() {
  return (
    <Accordion headerLevel={ 3 }>
      <AccordionItem id="item1">
        <AccordionHeader>
          Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          <p>
            This accordion item is styled by CSS that targets the default classes provided by React ARIA
            Widgets. Since React ARIA Widgets also exposes the accordion&apos;s state via HTML data attributes,
            we can target selectors such as <code>[data-expanded]</code> or <code>[data-disabled]</code>.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader
          headerProps={{ className: 'custom-accordion-header' }}
          buttonProps={{ className: 'custom-accordion-button' }}
        >
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel className="custom-accordion-panel">
          <p> 
            This accordion item is styled by passing in strings for <code>className</code> and
            CSS that targets the supplied classes and the state exposed by React ARIA Widgets.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader
          headerProps={{ style: { color: 'hsl(217, 71%, 45%)' } }}
          buttonProps={{ style: { color: 'inherit' } }}
        >
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel style={{ color: 'hsl(217, 71%, 45%)' }}>
          <p className="mb-4">
            This accordion item is styled by passing in objects for <code>style</code>.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item4">
        <AccordionHeader
          headerProps={{ className: ({ isExpanded }) => \`another-custom-header $\{isExpanded ? 'expanded' : 'collapsed'}\` }}
          buttonProps={{ className: ({ isExpanded }) => \`another-custom-button $\{isExpanded ? 'expanded' : 'collapsed'}\` }}
        >
          Accordion Item 4
        </AccordionHeader>
        <AccordionPanel className={ ({ isExpanded }) => \`another-custom-panel $\{isExpanded ? 'expanded' : 'collapsed'}\` }>
          <p>
            This accordion item is styled by passing in functions for <code>className</code>. These functions
            have access to the accordion&apos;s state, allowing you to dynamically apply classes.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item5">
        <AccordionHeader
          headerProps={{ style: ({ isExpanded }) => isExpanded ? { color: 'hsl(0, 0%, 100%)' } : {} }}
          buttonProps={{ style: ({ isExpanded }) => isExpanded ? { color: 'inherit', backgroundColor: 'hsl(217, 71%, 53%' } : {} }}
        >
          Accordion Item 5
        </AccordionHeader>
        <AccordionPanel style={ ({ isExpanded }) => isExpanded ? {} : { display: 'none' } }>
          <p className="mb-4">
            This accordion item is styled by passing in functions for <code>style</code>. As before, these
            functions allow you to dynamically apply styles based on the accordion&apos;s state.
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item6">
        <AccordionHeader>
          { ({ id, getIsExpanded }) => (
            <span
              className={ getIsExpanded(id) ? 'expanded' : 'collapsed' }
              style={ getIsExpanded(id) ? { color: 'hsl(217, 71%, 45%)' } : {} }
            >
              Accordion Item 6
            </span>
          ) }
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, getIsExpanded }) => (
            <p
              className={ getIsExpanded(id) ? 'expanded' : 'collapsed' }
              style={ getIsExpanded(id) ? { color: 'hsl(217, 71%, 45%)' } : {} }
            >
              The content for this accordion item is rendered with a render function. Since these render
              functions have access to the accordion&apos;s state, you can dynamically style your content.
            </p>
          ) }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}`;

const STYLED_ACCORDION_CSS_EXAMPLE =
`.react-aria-widgets-accordion-panel[data-expanded=false] {
  display: none;
}

.custom-accordion-panel[data-expanded=false] {
  display: none;
}

.another-custom-panel.collapsed {
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
        Please note that this library should <strong>NOT</strong> be used in a production environment! It&apos;s
        still in a pre-alpha stage and the API is subject to major breaking changes.
      </p>
      <h2>Features</h2>
      <ul>
        <li>
          Unstyled, accessible components that are easily composable and customizable
        </li>
        <li>
          Modularized design that gives developers the freedom to choose which hooks, components, etc. they wish to import
        </li>
        <li>
          Adheres to the APG complete with focus control and keyboard support.
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
        for it to be used out of the box.
      </p>
      <p>
        For example, certain patterns rely on styling to handle some of the key features that define that
        pattern. One instance is the accordion pattern - without styles, expanding/collapsing the constituent
        sections wouldn&apos;t behave properly. However, React ARIA Widgets provides <strong>no</strong> default styles.
      </p>
      <p>
        Still, React ARIA Widgets provides state management and aims to maximize compatibility with the variety
        of CSS libraries, frameworks, etc., in the front-end ecosystem. Building fully working implementations of each
        pattern can be as simple as passing in some <code>className</code> props using your framework of choice.
      </p>
      <UnstyledBasicAccordion headerLevel={ 3 } />
      <SyntaxHighlighter language="tsx">
        { UNSTYLED_ACCORDION_EXAMPLE }
      </SyntaxHighlighter>
      <p>
        If you open your browser&apos;s developer tools and you click on the buttons, you&apos;ll see that the accordion
        will set the HTML and ARIA attributes correctly. However, other than the default styles that come from your
        browser and this website&apos;s CSS framework, the accordion is completely unstyled, including any styles that
        should handle collapsing an accordion item when toggled.
      </p>
      <p>
        React ARIA Widgets aims to be as flexible as possible, and several different styling options are
        displayed in the following example.
      </p>
      <StyledAccordion headerLevel={ 3 } />
      <SyntaxHighlighter language="tsx">
        { STYLED_ACCORDION_EXAMPLE }
      </SyntaxHighlighter>
      <SyntaxHighlighter language="scss">
        { STYLED_ACCORDION_CSS_EXAMPLE }
      </SyntaxHighlighter>
      <p>
        In addition to styling options, React ARIA Widgets also provides hooks and other primitives
        that can be used to build finer-tuned implementations. For more information, see each
        patterns&apos; individual documentation page.
      </p>
    </article>
  );
}
