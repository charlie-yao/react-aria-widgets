import Head from 'next/head';

//Components
import SyntaxHighlighter from '../../components/SyntaxHighlighter';

const IMPORT_EXAMPLE =
`import { useAccordion } from 'react-aria-widgets/accordion';

Cannot find module 'react-aria-widgets/accordion' or its corresponding type declarations. (tsserver 2307)`;

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
        <h2>Frequently Asked Questions (FAQ)</h2>
        <h3 id="faq-requirements">Requirements</h3>
        <p>
          React ARIA Widgets transpiles to ES6 code and requires React v18. In the future, we plan on expanding
          support back to React v16.8.
        </p>
        <h3 id="faq-typescript-submodule-types">TypeScript can&apos;t find a sub-module or its type declarations</h3>
        <p>
          If you&apos;re writing a TypeScript application and you import something from one of React ARIA Widget&apos;s
          sub-modules, you may run into the following error:
        </p>
        <SyntaxHighlighter language="typescript">
          { IMPORT_EXAMPLE }
        </SyntaxHighlighter>
        <p>
          To fix this, you can import directly from <code>react-aria-widgets</code>, though it may increase your
          bundle sizes. Another option would be to change <code>moduleResolution</code> to <code>node16</code> in
          your <code>tsconfig.json</code>.
        </p>
        <p>
          React ARIA Widgets exposes its sub-modules and their type declarations by listing them with
          the <code>exports</code> field in its <code>package.json</code>, but this isn&apos;t supported
          in older versions of Node.js.
        </p>
        <h3 id="faq-hidden-vs-display-none">
          <code>hidden</code> versus <code>display: none;</code>
        </h3>
        <p>
          At the time of writing, many of the example implementations shown in the ARIA
          Authoring Practices Guide (APG) use the <code>hidden</code> attribute to handle expand/collapse states.
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
      </article>
    </>
  );
}
