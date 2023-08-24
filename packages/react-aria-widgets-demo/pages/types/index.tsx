import Head from 'next/head';

//Components
import SyntaxHighlighter from '../../components/SyntaxHighlighter';

const VALID_HTML_HEADER_LEVELS = `type ValidHTMLHeaderLevels = 1 | 2 | 3 | 4 | 5 | 6;`;

const AS_PROP =
`interface AsProp<C extends React.ElementType> {
  as?: C;
}`;

const PROPS_WITH_AS = `type PropsWithAs<C extends React.ElementType, P> = AsProp<C> & P;`;

const POLYMORPHIC_REF =
`type PolymorphicRef<
  C extends React.ElementType
> = React.ComponentPropsWithRef<C>['ref'];`;

const POLYMORPHIC_COMPONENT_PROPS_WITHOUT_REF =
`type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  P
> =
  PropsWithAs<C, P> & 
  Omit<
    React.ComponentPropsWithoutRef<C>,
    keyof PropsWithAs<C, P>
  >;`;

const POLYMORPHIC_COMPONENT_PROPS_WITH_REF =
`type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  P
> =
  PropsWithAs<C, P> & 
  Omit<
    React.ComponentPropsWithRef<C>,
    keyof PropsWithAs<C, P>
  >;`

const POLYMORPHIC_FORWARD_REF_COMPONENT =
`interface PolymorphicForwardRefComponent<
  P,
  D extends React.ElementType = React.ElementType
> {
  <C extends React.ElementType = D>(
    props: PolymorphicComponentPropsWithRef<C, P>
  ): React.ReactNode;

  defaultProps?: Partial<PolymorphicComponentPropsWithRef<React.ElementType, P>>;
  propTypes?: React.WeakValidationMap<PolymorphicComponentPropsWithRef<React.ElementType, P>>;
  displayName?: string;
}`;

export default function SharedTypesPages() {
  return (
    <>
      <Head>
        <title>Shared Types - React ARIA Widgets</title>
      </Head>
      <article className="content container is-max-desktop">
        <h1>Shared Types</h1>
        <div className="table-container">
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Defintion</th>
              </tr>
            </thead>
            <tbody>
              <tr id="valid-html-header-levels">
                <td><code>ValidHTMLHeaderLevels</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { VALID_HTML_HEADER_LEVELS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="as-prop">
                <td><code>AsProp</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { AS_PROP }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="props-with-as">
                <td><code>PropsWithAs</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { PROPS_WITH_AS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="polymorphic-ref">
                <td><code>PolymorphicRef</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { POLYMORPHIC_REF }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="polymorphic-component-props-without-ref">
                <td><code>PolymorphicComponentPropsWithoutRef</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { POLYMORPHIC_COMPONENT_PROPS_WITHOUT_REF }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="polymorphic-component-props-with-ref">
                <td><code>PolymorphicComponentPropsWithRef</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { POLYMORPHIC_COMPONENT_PROPS_WITH_REF }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="polymorphic-forward-ref-component">
                <td><code>PolymorphicForwardRefComponent</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { POLYMORPHIC_FORWARD_REF_COMPONENT }
                  </SyntaxHighlighter>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}
