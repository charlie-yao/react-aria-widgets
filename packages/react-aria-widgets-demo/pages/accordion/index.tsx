import Head from 'next/head';
import Link from 'next/link';

//Components
import SubNav from '../../components/accordion/SubNav';
import SyntaxHighlighter from '../../components/SyntaxHighlighter';
import BasicAccordion from '../../components/accordion/BasicAccordion';
import RenderPropAccordion from '../../components/accordion/RenderPropAccordion';
import DisableItemAccordion from '../../components/accordion/DisableItemAccordion';
import InitializeStateAccordion from '../../components/accordion/InitializeStateAccordion';
import FocusAccordion from '../../components/accordion/FocusAccordion';
import CallbackAccordion from '../../components/accordion/CallbackAccordion';
import RemoteControlAccordion from '../../components/accordion/RemoteControlAccordion';
import StyledAccordion from '../../components/accordion/StyledAccordion';
import MyAccordion from '../../components/accordion/MyAccordion';

const IMPORT_EXAMPLE =
`import { Accordion } from 'react-aria-widgets';
import { Accordion } from 'react-aria-widgets/accordion';`;

const BASIC_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

function BasicAccordion() {
  return (
    <Accordion headerLevel={ 4 }>
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

const DISABLE_MULTIPLE_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

function DisableMultipleAccordion() {
  return (
    <Accordion headerLevel={ 4 } allowMultiple={ false }>
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

const DISABLE_COLLAPSE_LAST_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

function DisableCollapseLastAccordion() {
  return (
    <Accordion headerLevel={ 4 } allowCollapseLast={ false }>
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

const DISABLE_BOTH_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

function DisableBothAccordion() {
  return (
    <Accordion headerLevel={ 4 } allowMultiple={ false } allowCollapseLast={ false }>
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

const RENDER_PROP_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function RenderPropAccordion() {
  return (
    <Accordion headerlevel={ 4 }>
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            { ({ id, getIsExpanded }) => (
              <>
                Accordion Item { index + 1 }: Expanded = <code>{ getIsExpanded(id).toString() }</code>
              </>
            ) }
          </AccordionHeader>
          <AccordionPanel>
            { ({ id, headerLevel, allowMultiple, allowCollapseLast }) => (
              <ul>
                <li><code>id</code> = <code>{ id }</code></li>
                <li><code>headerLevel</code> = <code>{ headerLevel }</code></li>
                <li><code>allowMultiple</code> = <code>{ allowMultiple.toString() }</code></li>
                <li><code>allowCollapseLast</code> = <code>{ allowCollapseLast.toString() }</code></li>
              </ul>
            ) }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}`;

const DISABLE_ITEM_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function DisableItemAccordion() {
  return (
    <Accordion headerLevel={ 4 }>
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            { ({ id, getIsDisabled }) => (
              <>
                Accordion Item { index + 1 }: Disabled = <code>{ getIsDisabled(id).toString() }</code>
              </>
            ) }
          </AccordionHeader>
          <AccordionPanel>
            { ({ id, toggleDisabled, getIsDisabled }) => (
              <button type="button" onClick={ () => toggleDisabled(id) }>
                { getIsDisabled(id) ? 'Enable' : 'Disable' } <code>{ id }</code>
              </button>
            ) }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}`;

const INITIALIZE_STATE_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function InitializeStateAccordion(props: AccordionProps) {
  return (
    <Accordion
      initialExpanded={ [ 'item1', 'item2' ] }
      initialDisabled={ [ 'item2' ] }
      { ...props }
    >
    { ITEMS.map((id, index) => (
      <AccordionItem key={ id } id={ id }>
        <AccordionHeader>
          Accordion Item { index + 1 }
        </AccordionHeader>
        <AccordionPanel>
          { ({ id, getIsExpanded, getIsDisabled }) => (
            <ul>
              <li><code>getIsExpanded(id)</code> = <code>{ getIsExpanded(id).toString() }</code></li>
              <li><code>getIsDisabled(id)</code> = <code>{ getIsDisabled(id).toString() }</code></li>
            </ul>
          ) }
        </AccordionPanel>
      </AccordionItem>
    )) }
    </Accordion>
  );
}`;

const FOCUS_ACCORDION_EXAMPLE =
`import { useState } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function FocusAccordion() {
  return (
    <Accordion headerLevel={ 4 }>
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            Accordion Item { index + 1 }: ID = { id }
          </AccordionHeader>
          <AccordionPanel>
            { (args) => <FocusForm { ...args } /> }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}

function FocusForm({
  id,
  focusItemId,
  focusPrevItem,
  focusNextItem,
  focusFirstItem,
  focusLastItem,
}) {
  const [ inputItemId, setInputItemId ] = useState('');

  return (
    <>
      <form onSubmit={ (e) => { e.preventDefault(); focusItemId(inputItemId); }}>
        <label htmlFor={ \`$\{id}-focus-input\` }>Item ID:</label> 
        <input
          id={ \`$\{id}-focus-input\` }
          type="text"
          onChange={ (e) => setInputItemId(e.target.value) }
        />
        <button type="submit">Focus Item</button>
      </form>
      <button type="button" onClick={ () => focusFirstItem() }>
        Focus First Item
      </button>
      <button type="button" onClick={ () => focusPrevItem(id) }>
        Focus Previous Item
      </button>
      <button type="button" onClick={ () => focusNextItem(id) }>
        Focus Next Item
      </button>
      <button type="button" onClick={ () => focusLastItem() }>
        Focus Last Item
      </button>
    </>
  );
}`;

const CALLBACK_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function CallbackAccordion() {
  return (
    <Accordion
      headerlevel={ 4 }
      onToggleExpanded={ expandedItems => console.log(expandedItems) }
      onToggleDisabled={ disabledItems => console.log(disabledItems) }
      onFocusChange={ ({ elem, index, id }) => console.log(elem, index, id) }
    >
      { ITEMS.map((id, index) => (
        <AccordionItem key={ id } id={ id }>
          <AccordionHeader>
            { ({ id, getIsDisabled }) => (
              <>
                Accordion Item { index + 1 }: Disabled = <code>{ getIsDisabled(id).toString() }</code>
              </>
            ) }
          </AccordionHeader>
          <AccordionPanel>
            { ({ id, toggleDisabled, getIsDisabled }) => (
              <button type="button" onClick={ () => toggleDisabled(id) }>
                { getIsDisabled(id) ? 'Enable' : 'Disable' } <code>{id}</code>
              </button>
            ) }
          </AccordionPanel>
        </AccordionItem>
      )) }
    </Accordion>
  );
}`;

const REMOTE_CONTROL_ACCORDION_EXAMPLE =
`import { useAccordion, ControlledAccordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

const ITEMS = [ 'item1', 'item2', 'item3' ];

function RemoteControlAccordion(props) {
  const contextValue = useAccordion(props);
  const { toggleExpanded, toggleDisabled, focusItemId, getIsDisabled } = contextValue;
  const toggleExpandButtons = [];
  const toggleDisableButtons = [];
  const focusButtons = [];
  const accordionItems = [];

  ITEMS.forEach((id, index) => {
    toggleExpandButtons.push(
      <div className="control">
        <button
          key={ id }
          type="button"
          value={ id }
          onClick={ (e) => toggleExpanded(e.currentTarget.value) }
          className="button is-primary"
        >
          Expand/Collapse { id }
        </button>
      </div>
    );

    toggleDisableButtons.push(
      <div className="control">
        <button
          key={ id }
          type="button"
          value={ id }
          onClick={ (e) => toggleDisabled(e.currentTarget.value) }
          className="button is-primary"
        >
          Enable/Disable { id }
        </button>
      </div>
    );

    focusButtons.push(
      <div className="control">
        <button
          key={ id }
          type="button"
          value={ id }
          onClick={ (e) => focusItemId(e.currentTarget.value) }
          className="button is-primary"
        >
          Focus { id }
        </button>
      </div>
    );
    
    accordionItems.push(
      <AccordionItem id={ id } key={ id }>
        <AccordionHeader>
          Accordion Item { index + 1 }: Disabled = <code>{ getIsDisabled(id).toString() }</code>
        </AccordionHeader>
        <AccordionPanel>
          Hello world! 
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <>
      <form onSubmit={ e => e.preventDefault() } style={{ paddingBottom: '1rem' }}>
        <fieldset className="field is-grouped">
          <legend>Expand/Collapse Items</legend>
          { toggleExpandButtons }
        </fieldset>
        <fieldset className="field is-grouped">
        <legend>Enable/Disable Items</legend>
          { toggleDisableButtons }
        </fieldset>
        <fieldset className="field is-grouped">
          <legend>Focus Items</legend>
          { focusButtons }
        </fieldset>
      </form>
      <ControlledAccordion contextValue={ contextValue }>
        { accordionItems }
      </ControlledAccordion>
    </>
  );
}`;

const ACCORDION_HTML_MARKUP_EXAMPLE =
`<h1 class="react-aria-widgets-accordion-header" data-expanded="false" data-disabled="false">
  <button class="react-aria-widgets-accordion-button" aria-expanded="false" aria-disabled="false">
    Accordion Item Header
  </button>
</h1>
<section class="react-aria-widgets-panel" data-expanded="false" data-disabled="false">
  Hello world!
</section>`;

const STYLED_ACCORDION_EXAMPLE =
`import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from 'react-aria-widgets/accordion';

function StyledAccordion() {
  return (
    <Accordion headerLevel={ 4 }>
      <AccordionItem id="item1">
        <AccordionHeader>
          Accordion Item 1
        </AccordionHeader>
        <AccordionPanel>
          This accordion item is styled by CSS that targets the default classes provided by React ARIA
          Widgets. Since React ARIA Widgets also exposes the accordion&apos;s state via HTML data attributes,
          we can target selectors such as <code>[data-expanded]</code> or <code>[data-disabled]</code>.
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
          This accordion item is styled by passing in strings for <code>className</code> and
          CSS that targets the supplied classes and the state exposed by React ARIA Widgets.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader
          headerProps={{ style: { color : 'hsl(217, 71%, 45%)'} }}
          buttonProps={{ style: { color: 'inherit' } }}
        >
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel style={{ color: 'hsl(217, 71%, 45%)' }}>
          This accordion item is styled by passing in objects for <code>style</code>.
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
          This accordion item is styled by passing in functions for <code>className</code>. These functions
          have access to the accordion&apos;s state, allowing you to dynamically apply classes.
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
          This accordion item is styled by passing in functions for <code>style</code>. As before, these
          functions allow you to dynamically apply styles based on the accordion&apos;s state.
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

const CUSTOM_ACCORDION_EXAMPLE =
`import { useAccordion, ControlledAccordion } from 'react-aria-widgets/accordion';

function CustomAccordion({ children, ...rest }) {
  const contextValue = useAccordion(rest);

  return (
    <ControlledAccordion contextValue={ contextValue }>
      { children }
    </ControlledAccordion>
  );
}`;

const CUSTOM_ACCORDION_HEADER_EXAMPLE =
`import { useAccordionContext } from 'react-aria-widgets/accordion';

function CustomAccordionHeader({ children = null, id }) {
  const {
    headerLevel,
    getIsExpanded,
    getIsDisabled,
    toggleExpanded,
    pushItemRef,
    focusPrevItem,
    focusNextItem,
    focusFirstItem,
    focusLastItem,
  } = useAccordionContext();
  const HeaderElement = \`h$\{headerLevel}\`;
  const isExpanded = getIsExpanded(id);
  const isDisabled = getIsDisabled(id);

  const refCallback = (ref) => {
    pushItemRef(ref, id);
  };

  const onClick = () => {
    toggleExpanded(id);
  };

  const onKeyDown = (event) => {
    const { key } = event;

    if(key === 'ArrowUp') {
      event.preventDefault();
      focusPrevItem(id);
    }
    else if(key === 'ArrowDown') {
      event.preventDefault();
      focusNextItem(id);
    }
    else if(key === 'Home') {
      event.preventDefault();
      focusFirstItem();
    }
    else if(key === 'End') {
      event.preventDefault();
      focusLastItem();
    }
  };

  return (
    <HeaderElement className="my-accordion-header">
      <button
        type="button"
        className="my-accordion-button"
        id={ id }
        onClick={ onClick }
        onKeyDown={ onKeyDown }
        aria-controls={ \`$\{id}-panel\` }
        aria-expanded={ isExpanded }
        aria-disabled={ isDisabled }
        ref={ refCallback }
      >
        { children }
      </button>
    </HeaderElement>
  );
}`;

const CUSTOM_ACCORDION_PANEL_EXAMPLE =
`import { useAccordionContext } from 'react-aria-widgets/accordion';

function CustomAccordionPanel({ children = null, id }) {
  const { getIsExpanded } = useAccordionContext();
  const isExpanded = getIsExpanded(id);

  return (
    <section
      id={ \`$\{id}-panel\` }
      aria-labelledby={ id }
      className={ \`my-accordion-panel $\{isExpanded ? 'expanded' : 'collapsed'}\` }
    >
      { children }
    </section>
  );
}`;

const MY_ACCORDION_EXAMPLE =
`import CustomAccordion from "./CustomAccordion";
import CustomAccordionHeader from "./CustomAccordionHeader";
import CustomAccordionPanel from "./CustomAccordionPanel";

function MyAccordion(props) {
  return (
    <CustomAccordion { ...props }>
      <CustomAccordionHeader id="item1">
        Joke #1
      </CustomAccordionHeader> 
      <CustomAccordionPanel id="item1">
        <p>Why don&apos;t scientists trust atoms? Because they make up everything!</p>
      </CustomAccordionPanel>
      <CustomAccordionHeader id="item2">
        Joke #2 
      </CustomAccordionHeader> 
      <CustomAccordionPanel id="item2">
        Why did the bicycle fall over? Because it was two tired!
      </CustomAccordionPanel>
      <CustomAccordionHeader id="item3">
        Joke #3
      </CustomAccordionHeader> 
      <CustomAccordionPanel id="item3">
        What do you call fake spaghetti? An &quot;impasta&quot;!
      </CustomAccordionPanel>
    </CustomAccordion>
  );
}`;

const BUTTON_PROPS_EXAMPLE =
`<BaseAccordionHeader
  buttonProps={{ 'aria-expanded': false }}
  isExpanded={ true }
/>`;

const HEADER_PROPS_EXAMPLE =
`<BaseAccordionHeader
  headerProps={{ className: 'custom-h2-class' }}
/>`;

const MDN_DISABLED_LINK = 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled';

function AccordionPage() {
  return (
    <>
      <Head>
        <title>Accordion - React ARIA Widgets</title>
      </Head>
      <article className="content container is-max-desktop">
        <h1 id="accordion">Accordion</h1>
        <p>
          From the
          { ' ' }
          <a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">
            ARIA Authoring Practices Guide (APG)
          </a>
          { /**/ }
          :
        </p>
        <blockquote cite="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">
          An accordion is a vertically stacked set of interactive headings that each contain
          a title, content snippet, or thumbnail representing a section of content. The headings
          function as controls that enable users to reveal or hide their associated sections of
          content. Accordions are commonly used to reduce the need to scroll when presenting
          multiple sections of content on a single page.
        </blockquote>
        <h2 id="usage-and-examples">Usage and Examples</h2>
        <p>
          Components and hooks for the accordion pattern can be imported directly from the package itself, or
          from the <code>/accordion</code> sub-module.
        </p>
        <SyntaxHighlighter language="typescript">
          { IMPORT_EXAMPLE }
        </SyntaxHighlighter>
        <p>
          Importing from the sub-module means introducing less code into your bundles, but if you&apos;re writing
          a TypeScript application, you may need to change <code>moduleResolution</code> to <code>node16</code> in
          your <code>tsconfig.json</code>. For more information, see
          the <Link href="/support#faq-typescript-submodule-types">FAQ</Link>.
        </p>
        <p>
          Additionally, because React ARIA Widgets comes with no styling, accordions will not have the proper
          expand/collapse behavior out of the box. For the sake of demonstration, the following examples will
          have styling applied to showcase expand/collapse behavior. For more information, see
          the <a href="#styling">styling section</a>.
        </p>
        <h3 id="basic-usage">
          Basic Usage
        </h3>
        <p>
          A basic accordion consists of an <code>&lt;Accordion&gt;</code> wrapping around
          one or more <code>&lt;AccordionItem&gt;</code>s, where
          each <code>&lt;AccordionItem&gt;</code> has an <code>&lt;AccordionHeader&gt;</code> and
          an <code>&lt;AccordionPanel&gt;</code>.
        </p>
        <p>
          Out of the box, React ARIA Widgets provides focus control as described in the APG. You can
          use <kbd>ArrowDown</kbd>, <kbd>ArrowUp</kbd>, <kbd>Home</kbd>, and <kbd>End</kbd> to
          switch focus between each section.
        </p>
        <p>
          A <code>headerLevel</code> prop must be supplied to the <code>&lt;Accordion&gt;</code>,
          and each <code>&lt;AccordionItem&gt;</code> must have a unique <code>id</code> prop.
        </p>
        <BasicAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { BASIC_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="disable-multiple-expanded">
          Disable Multiple Expanded Sections
        </h3>
        <p>
          By default, multiple sections can be expanded and collapsed at the same time, but this behavior
          can be turned off with the <code>allowMultiple</code> prop.
        </p>
        <BasicAccordion headerLevel={ 4 } allowMultiple={ false } />
        <SyntaxHighlighter language="tsx">
          { DISABLE_MULTIPLE_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="disable-collapsing-all">
          Disable Collapsing All Sections
        </h3>
        <p>
          By default, all of the accordion items can be simultaneously collapsed. If
          the <code>allowCollapseLast</code> prop is <code>false</code>, the final expanded section
          cannot be collapsed.
        </p>
        <BasicAccordion headerLevel={ 4 } allowCollapseLast={ false } />
        <SyntaxHighlighter language="tsx">
          { DISABLE_COLLAPSE_LAST_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="disable-both">
          Disabling <code>allowMultiple</code> and <code>allowCollapseLast</code>
        </h3>
        <BasicAccordion
          headerLevel={ 4 }
          allowMultiple={ false }
          allowCollapseLast={ false }
        />
        <SyntaxHighlighter language="tsx">
          { DISABLE_BOTH_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="render-prop">
          Rendering with Render Props
        </h3>
        <p>
          In addition to normal React
          nodes, <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code> both
          accept a render function as <code>children</code>. These render functions have access to all
          of the state and methods that pertain to the accordion (specifically, what is returned
          by <code>useAccordion</code> and <code>useAccordionItem</code>).
        </p>
        <RenderPropAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { RENDER_PROP_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="disabling-items">
          Prevent Expanding/Collapsing Accordion Items
        </h3>
        <p>
          Accordion items can be manually disabled with the method <code>toggleDisabled</code>, preventing
          them from being expanded/collapsed. Note that <code>&lt;AccordionHeader&gt;</code> will
          set the <code>aria-disabled</code> attribute, but not the <code>disabled</code> attribute, which has
          various implications. See the <a href={ MDN_DISABLED_LINK }>MDN Web Docs</a> for more information.
        </p>
        <DisableItemAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { DISABLE_ITEM_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="initialize-state">
          Initialize Expanded/Disabled State
        </h3>
        <p>
          By default, all accordion items are collapsed and enabled. You can initialize certain items
          to be expanded or disabled by passing arrays of string IDs to
          the <code>initialExpanded</code> and <code>initialDisabled</code> props.
        </p>
        <p>
          If <code>allowMultiple</code> is disabled, React ARIA Widgets will only expand the first ID
          in <code>initialExpanded</code>. However, it does so naively - it essentially just
          checks <code>initialExpanded[0]</code>. Due to implementation limitations, it currently
          cannot validate that the supplied IDs actually pertain to an accordion item and intelligently
          pick the first valid ID.
        </p>
        <InitializeStateAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { INITIALIZE_STATE_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="focusing-items">
          Focusing Items
        </h3>
        <p>
          <code>&lt;AccordionHeader&gt;</code> automatically attaches a keydown event that implements the
          keyboard/focus behavior described in the APG. Try tabbing to one of the buttons and pressing
          the <kbd>ArrowDown</kbd>, <kbd>ArrowUp</kbd>, <kbd>Home</kbd>, or <kbd>End</kbd> keys. Additionally,
          you can manually focus accordion items through the methods provided by React ARIA Widgets.
        </p>
        <FocusAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { FOCUS_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="state-change-callbacks">
          Callbacks on State Changes
        </h3>
        <p>You can pass callback functions that fire after state changes:</p>
        <ul>
          <li><code>onToggleExpanded</code> - lets users know which items are expanded</li>
          <li><code>onToggleDisabled</code> - lets users know which items are disabled</li>
          <li><code>onFocusItem</code> - lets users know which item was focused</li>
        </ul>
        <p>
          Note that <code>onFocusItem</code> doesn&apos;t trigger for focus events in general, but rather, when
          React ARIA Widgets&apos; focus methods are called. In other words, tabbing to a button won&apos;t trigger
          it, but pressing <kbd>ArrowDown</kbd> will.
        </p>
        <p>
          Try opening your browser&apos;s developer tools and playing with the example below.
        </p>
        <CallbackAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { CALLBACK_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="controlling-state">
          Controlling State
        </h3>
        <p>
          As demonstrated previously, state can be manually controlled from &quot;below&quot; the accordion by using
          render props. Alternatively, rather than using something like <code>&lt;AccordionHeader&gt;</code>,
          React ARIA Widgets exports the
          hooks <code>useAccordionContext</code> and <code>useAccordionItemContext</code> which can be
          used to write custom header or panel implementations.
        </p>
        <p>
          State can be controlled from &quot;above&quot; the accordion by using <code>useAccordion</code>, a hook
          that provides methods to manage the state, and <code>&lt;ControlledAccordion&gt;</code>, a thin
          wrapper over the context provider that passes those methods down. In
          fact, <code>&lt;Accordion&gt;</code> is itself actually just a thin wrapper that tightly couples
          these two for the sake of convenience.
        </p>
        <RemoteControlAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { REMOTE_CONTROL_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="styling">
          Styling
        </h3>
        <p>
          There are a few different ways to style <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code>.
        </p>
        <ul>
          <li>Write CSS that targets the default classes applied by React ARIA Widgets</li>
          <li>Supply a function for <code>className</code> that receives state and returns a string</li>
          <li>Supply a string for <code>className</code> </li>
          <li>Supply a function for <code>style</code> that receives state and returns an object</li>
          <li>Supply an object for <code>style</code></li>
        </ul>
        <p>
          The easiest way may be to simply write CSS that targets the default classes provided by React ARIA
          Widgets. The classes are:
        </p>
        <ul>
          <li><code>react-aria-widgets-accordion-header</code></li>
          <li><code>react-aria-widgets-accordion-button</code></li>
          <li><code>react-aria-widgets-accordion-panel</code></li>
        </ul>
        <p>
          You can also provide custom classes by passing strings to <code>className</code>. Note
          that they will replace the default classes, rather than append to them. Similarly, you can
          provide an object for <code>style</code>.
        </p>
        <p>
          React ARIA Widgets also exposes the accordion&apos;s state through HTML attributes, allowing them to be
          targeted with CSS selectors.
        </p>
        <div className="table-container">
          <table className="table is-striped is-hoverable">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Default CSS Class</th>
                <th scope="col">State Selector</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={ 2 } style={{ verticalAlign: 'middle' }}>
                  <code>&lt;AccordionHeader&gt;</code>
                </td>
                <td rowSpan={ 2 } style={{ verticalAlign: 'middle' }}>
                  <code>react-aria-widgets-accordion-header</code>
                </td>
                <td><code>[data-expanded=true | false]</code></td>
                <td>Whether the panel is expanded or collapsed.</td>
              </tr>
              <tr>
                <td><code>[data-disabled=true | false]</code></td>
                <td>Whether the panel is enabled or disabled.</td>
              </tr>
              <tr>
                <td rowSpan={ 2 } style={{ verticalAlign: 'middle' }}>
                  <code>&lt;AccordionHeader&gt;</code>
                </td>
                <td rowSpan={ 2 } style={{ verticalAlign: 'middle' }}>
                  <code>react-aria-widgets-accordion-button</code>
                </td>
                <td><code>[aria-expanded=true | false]</code></td>
                <td>Whether the panel is expanded or collapsed.</td>
              </tr>
              <tr>
                <td><code>[aria-disabled=true | false]</code></td>
                <td>Whether the panel is enabled or disabled.</td>
              </tr>
              <tr>
                <td rowSpan={ 2 } style={{ verticalAlign: 'middle' }}>
                  <code>&lt;AccordionPanel&gt;</code>
                </td>
                <td rowSpan={ 2 } style={{ verticalAlign: 'middle' }}>
                  <code>react-aria-widgets-accordion-panel</code>
                </td>
                <td><code>[data-expanded=true | false]</code></td>
                <td>Whether the panel is expanded or collapsed.</td>
              </tr>
              <tr>
                <td><code>[data-disabled=true | false]</code></td>
                <td>Whether the panel is enabled or disabled.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The default rendered markup looks something like this:
        </p>
        <SyntaxHighlighter language="tsx">
          { ACCORDION_HTML_MARKUP_EXAMPLE }
        </SyntaxHighlighter>
        <p>
          Finally, you can provide a function to <code>className</code> or <code>style</code> that allows
          you to dynamically apply styles depending on the state of the accordion. And, as alluded to
          in previous examples, you can dynamically style your content if it&apos;s rendered with a render prop.
        </p>
        <StyledAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { STYLED_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <SyntaxHighlighter language="css">
          { STYLED_ACCORDION_CSS_EXAMPLE }
        </SyntaxHighlighter>
        <p>
          Unfortunately, at this time, if you wish you use the <code>hidden</code> attribute to collapse your panels,
          React ARIA Widgets doesn&apos;t have a good first-class API for dynamically applying it. You can create
          your own accordion panel implementation using the hooks provided, but it&apos;s admittedly awkward
          to do that just for one HTML attribute. Still, it&apos;s arguable that in most cases,
          using <code>display: none;</code> has better semantics that <code>hidden</code>. For more information,
          see the <Link href="/support#faq-hidden-vs-display-none">FAQ</Link>.
        </p>
        <h3 id="further-customization">
          Further Customization
        </h3>
        <p>
          React ARIA Widgets exposes all of the hooks, contexts, components, etc. that it uses, allowing you to
          create your own accordion implementations.
        </p>
        <h4>Creating a Custom <code>&lt;Accordion&gt;</code></h4>
        <p>
          As mentioned in the <a href="#controlling-state">Controlling State</a> section, one can simply
          combine <code>useAccordion</code> and <code>&lt;ControlledAccordion&gt;</code> to create a
          new version of <code>&lt;Accordion&gt;</code>.
        </p>
        <SyntaxHighlighter language="tsx">
          { CUSTOM_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h4>Creating Custom Headers and Panels</h4>
        <p>
          You can use the hook <code>useAccordionContext</code> to read and modify the accordion state that
          gets sent down from <code>&lt;ControlledAccordion&gt;</code>. We'll be using it to create our own
          accordion headers and panels.
        </p>
        <p>
          We won&apos;t be using them in this example, but for the sake of convenience, React ARIA Widgets also provides
          the components <code>&lt;BaseAccordionHeader&gt;</code> and <code>&lt;BaseAccordionPanel&gt;</code> to
          simplify building your own accordions. They&apos;re essentially just thin wrappers over HTML, but
          they use TypeScript and PropTypes to help remind you what HTML attributes are needed to fulfill
          the APG.
        </p>
        <SyntaxHighlighter language="tsx">
          { CUSTOM_ACCORDION_HEADER_EXAMPLE }
        </SyntaxHighlighter>
        <SyntaxHighlighter language="tsx">
          { CUSTOM_ACCORDION_PANEL_EXAMPLE }
        </SyntaxHighlighter>
        <h4>Putting It All Together</h4>
        <p>
          You'll notice that we didn't create another version of <code>&lt;AccordionItem&gt;</code>. Its main
          job is to make sure that the header and panel both have the same ID, so we won't be making a custom
          version of it for the sake of this example.
        </p>
        <p>
          Here's the completed accordion:
        </p>
        <MyAccordion headerLevel={ 5 } />
        <SyntaxHighlighter language="tsx">
          { MY_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h2 id="api">API</h2>
        <h3 id="hocs-and-hooks">Higher-Order Components and Hooks</h3>
        <h4 id="with-accordion-manager">withAccordionManager()</h4>
        <p>
          <code>withAccordionManager()</code> is a HOC that manages the underlying state for an accordion. It
          controls which panels are expanded/collapsed, which headers can/cannot be interacted with, and
          manages focus for keyboard users.
        </p>
        <h5>Props</h5>
        <div className="table-container">
          <table className="table is-hoverable">
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
                <td />
                <td>Controls whether or not multiple panels can be expanded at the same time.</td>
              </tr>
              <tr>
                <td><code>allowToggle</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td />
                <td>
                  Controls whether or not a panel can be collapsed after it has been expanded. Note
                  that if <code>allowMultiple</code> is <code>true</code>, then panels will always
                  be collapsible even if <code>allowToggle</code> is <code>false</code>. This
                  is to prevent situations where there would otherwise be multiple expanded panels
                  that can&apos;t be collapsed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Fields</h5>
        <div className="table-container">
          <table className="table is-hoverable">
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
                  Lets child components know whether or not multiple panels can be
                  expanded simultaneously.
                </td>
              </tr>
              <tr>
                <td><code>allowToggle</code></td>
                <td><code>boolean</code></td>
                <td>
                  Lets child components know whether or not panels can be collapsed
                  once they&apos;ve been expanded. Note that even if the HOC
                  received <code>false</code> as its <code>allowToggle</code> prop,
                  if <code>allowMultiple</code> is <code>true</code>, child components will
                  see <code>allowToggle</code> as <code>true</code> to reflect how the accordion
                  will actually behave.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Methods</h5>
        <h6>focusFirstItem(): void</h6>
        <p>
          Sets the focus to the first accordion header button. Note that each header button
          in the accordion MUST use <code>setHeaderRef()</code> for focus management to work
          properly.
        </p>
        <h6>focusLastItem(): void</h6>
        <p>
          Sets the focus to the last accordion header button. Note that each header button
          in the accordion MUST use <code>setHeaderRef()</code> for focus management to work
          properly.
        </p>
        <h6>focusNextItem(index: number): void</h6>
        <p>
          Sets the focus to the next (relative to <code>index</code>) accordion
          header button. Note that each header button in the accordion MUST
          use <code>setHeaderRef()</code> for focus management to work
          properly.
        </p>
        <h6>focusPrevItem(index: number): void</h6>
        <p>
          Sets the focus to the previous (relative to <code>index</code>) accordion
          header button. Note that each header button in the accordion MUST
          use <code>setHeaderRef()</code> for focus management to work
          properly.
        </p>
        <h6>focusHeader(index: number): void</h6>
        <p>
          Sets the focus to an arbitrary accordion header button. Note that each header button
          in the accordion MUST use <code>setHeaderRef()</code> for focus management to work
          properly.
        </p>
        <h6>getIsDisabled(id: string): boolean</h6>
        <p>
          Returns a boolean indicating if an accordion header cannot be
          interacted with. At the moment, an accordion header is only
          considered disabled if its panel is expanded and <code>allowToggle</code> is <code>false</code>.
        </p>
        <h6>getIsExpanded(id: string): boolean</h6>
        <p>
          Returns a boolean indicating if an accordion panel is
          collapsed or expanded.
        </p>
        <h6>setHeaderRef(ref: Object): void</h6>
        <p>
          A React callback ref that must be used by each accordion header button in order to properly
          manage focus.
        </p>
        <h6>toggleSection(id: string): void</h6>
        <p>
          Expands/collapses a panel of the accordion.
          Respects <code>allowMultiple</code> and <code>allowToggle</code>.
        </p>
        <h3 id="components">Components</h3>
        <h4 id="accordion-component">&lt;Accordion&gt;</h4>
        <p>
          <code>&lt;Accordion&gt;</code>s use the <code>withAccordionManager()</code> HOC and
          wrap around one or more <code>&lt;AccordionSection&gt;</code>s. They also forward the fields
          and methods they receive from <code>withAccordionManager()</code> to their children.
        </p>
        <h5>Props</h5>
        <div className="table-container">
          <table className="table is-hoverable">
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
                <td />
                <td>
                  An integer from 1 to 6 (inclusive) representing which HTML section heading element
                  (e.g. <code>&lt;h2&gt;</code>) to use for each accordion header.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Fields</h5>
        <div className="table-container">
          <table className="table is-hoverable">
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
                  An integer from 1 to 6 (inclusive) representing which HTML section heading element
                  (e.g. <code>&lt;h2&gt;</code>) to use for each accordion header.
                </td>
              </tr>
              <tr>
                <td><code>index</code></td>
                <td><code>number</code></td>
                <td>An integer representing the position of an accordion header/panel pair.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Methods</h5>
        <h6>onClick(event: SyntheticEvent&lt;&gt;): void</h6>
        <p>
          A premade event handler that can be attached to accordion header buttons
          to handle expanding/collapsing a particular panel. Used by <code>&lt;AccordionHeader&gt;</code>.
        </p>
        <p>
          If you wish to use this event handler with a custom accordion header, note that
          the button must have an <code>id</code> attribute corresponding to the ID
          of the accordion header/panel pair.
        </p>
        <h6>onKeyDown(event: SyntheticEvent&lt;&gt;): void</h6>
        <p>
          A premade event handler that can be attached to accordion header buttons to handle
          focus management. Implements the keyboard interactions described in
          the APG (<kbd>Down Arrow</kbd>, <kbd>Up Arrow</kbd>, <kbd>Home</kbd>, and <kbd>End</kbd>),
          and is used by <code>&lt;AccordionHeader&gt;</code>.
        </p>
        <p>
          If you wish to use this event handler with a custom accordion header, note that
          the button must have a <code>data-index</code> attribute corresponding to the
          position of the accordion header/panel pair.
        </p>
        <h4 id="accordion-section">&lt;AccordionSection&gt;</h4>
        <p>
          Represents a section of an accordion (i.e. a header/panel pair). Wraps around either a set of
          React nodes or a render function. Will automatically pass down the fields and methods it receives
          from <code>&lt;Accordion&gt;</code> (and, by extension, <code>withAccordionManager()</code>)
          to its children.
        </p>
        <h5>Props</h5>
        <div className="table-container">
          <table className="table is-hoverable">
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
                  Either be a render function or a set of React nodes
                  that represent an accordion header/panel pair. Children of this component
                  receive all of the fields and methods from <code>&lt;Accordion&gt;</code>, including
                  those that actually originate from <code>withAccordionManager()</code>.
                </td>
              </tr>
              <tr>
                <td><code>id</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>{ '\u2713' }</td>
                <td>
                  A unique identifier for the accordion section. Must be unique to the whole document as
                  it&apos;s used to generate HTML IDs for the header button and panel element, as well as
                  the <code>aria-controls</code> and <code>aria-labelledby</code> attributes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Fields</h5>
        <div className="table-container">
          <table className="table is-hoverable">
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
                <td>A unique identifier for the header/panel pair.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="accordion-header">&lt;AccordionHeader&gt;</h4>
        <p>
          <code>&lt;AccordionHeader&gt;</code> is a thin wrapper
          over <code>&lt;BaseAccordionHeader&gt;</code> that is designed to be used
          with <code>&lt;Accordion&gt;</code> and <code>&lt;AccordionSection&gt;</code>.
          Because <code>&lt;AccordionHeader&gt;</code> isn&apos;t meant to be used in a standalone manner,
          if you wish to write your own header implementation, <code>&lt;BaseAccordionHeader&gt;</code> may
          be a more suitable option.
        </p>
        <h5>Props</h5>
        <p>
          <code>&lt;AccordionHeader&gt;</code> automatically sets the following props onto the
          underlying <code>&lt;BaseAccordionHeader&gt;</code> using data
          from <code>&lt;AccordionSection&gt;</code> and so forth. Developers should not try
          to manually set them.
        </p>
        <ul>
          <li><code>controlsId</code></li>
          <li><code>headerLevel</code></li>
          <li><code>id</code></li>
          <li><code>isDisabled</code></li>
          <li><code>isExpanded</code></li>
          <li><code>onClick</code></li>
          <li><code>onKeyDown</code></li>
        </ul>
        <p>
          <code>&lt;AccordionHeader&gt;</code> can receive the following props:
        </p>
        <div className="table-container">
          <table className="table is-hoverable">
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
                <td><code>buttonProps</code></td>
                <td><code>{ '{ [key: string]: any }' }</code></td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  <p>
                    An object that is spread over the underlying <code>&lt;button&gt;</code> in order to
                    supply props and HTML attributes to it. Developers should be mindful of which fields
                    are used in <code>buttonProps</code> because it is spread after the other props are
                    applied (i.e. it can overwrite props that are supposed to be automatically supplied
                    from <code>&lt;AccordionSection&gt;</code>).
                  </p>
                  <p>
                    For more information,
                    see <a href="#base-accordion-header"><code>&lt;BaseAccordionHeader&gt;</code></a>.
                  </p>
                </td>
              </tr>
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
                    meet
                    { ' ' }
                    <a href="https://www.w3.org/TR/WCAG22/#parsing">
                      Success Criterion 4.4.1
                    </a>
                    { ' ' }
                    of the WCAG 2.2 guidelines.
                  </p>
                  <p>
                    See the
                    { ' ' }
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">
                      MDN Web Docs
                    </a>
                    { ' ' }
                    for more information.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>headerProps</code></td>
                <td><code>{ '{ [key: string]: any }' }</code></td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  <p>
                    An object that is spread over the underlying HTML section heading element
                    in order to supply props and HTML attributes to it.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="accordion-panel">&lt;AccordionPanel&gt;</h4>
        <p>
          An <code>&lt;AccordionPanel&gt;</code> is a thin wrapper
          over <code>&lt;BaseAccordionPanel&gt;</code> that is designed to be used
          with <code>&lt;Accordion&gt;</code> and <code>&lt;AccordionSection&gt;</code>.
          Because <code>&lt;AccordionPanel&gt;</code> isn&apos;t meant to be used in a standalone manner,
          if you wish to write your own panel implementation, <code>&lt;BaseAccordionPanel&gt;</code> may
          be a more suitable option.
        </p>
        <p>
          This component uses a CSS class with <code>display: none !important;</code> to represent
          the collapsed state, which may or may not be desired.
        </p>
        <h5>Props</h5>
        <p>
          <code>&lt;AccordionPanel&gt;</code> automatically sets the following props on the
          underlying <code>&lt;BaseAccordionPanel&gt;</code> using data
          from <code>&lt;AccordionSection&gt;</code> and so forth. Developers should not try to
          manually set them.
        </p>
        <ul>
          <li><code>id</code></li>
          <li><code>labelId</code></li>
        </ul>
        <p>
          <code>&lt;AccordionPanel&gt;</code> accepts the following props. Any props not listed here or
          under <code>&lt;BaseAccordionPanel&gt;</code> are automatically spread onto the underlying
          HTML element.
        </p>
        <div className="table-container">
          <table className="table is-hoverable">
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
                    Represents the actual content of the panel. Can be anything
                    renderable by React.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>&apos;&apos;</code></td>
                <td />
                <td>
                  <p>
                    A string representing one or more CSS classes.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>tagName</code></td>
                <td><code>string</code></td>
                <td><code>&apos;section&apos;</code></td>
                <td />
                <td>
                  <p>
                    A string representing what the underlying HTML element will be rendered as.
                    The <code>&lt;section&gt;</code> element is an element with
                    the <code>region</code> role, but there are times where this may be undesireable.
                    According to the APG:
                  </p>
                  <blockquote cite="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">
                    Avoid using the <code>region</code> role in circumstances that create landmark
                    region proliferation, e.g. in an accordion that contains more than approximately
                    6 panels that can be expanded at the same time.
                  </blockquote>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 id="base-components">Base Components</h3>
        <h4 id="base-accordion-header">&lt;BaseAccordionHeader&gt;</h4>
        <p>
          <code>&lt;BaseAccordionHeader&gt;</code> is a thin wrapper over basic HTML elements
          designed to help implement accordions according to the APG. It is
          the underlying component for <code>&lt;AccordionHeader&gt;</code>, and can also be used for
          custom accordion implementations.
        </p>
        <p>
          If a React ref is given, it will be forwarded to the underlying <code>&lt;button&gt;</code>.
        </p>
        <h5>Props</h5>
        <div className="table-container">
          <table className="table is-hoverable">
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
                <td><code>buttonProps</code></td>
                <td><code>{ '{ [key: string]: any }' }</code></td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  <p>
                    An object that is spread over the underlying <code>&lt;button&gt;</code> in order to
                    supply extra props and HTML attributes to it. Developers should take care which fields
                    are used in <code>buttonProps</code> because it is spread onto the HTML element
                    after the other props are applied (i.e. it can overwrite them). For example:
                  </p>
                  <SyntaxHighlighter language="jsx">
                    { BUTTON_PROPS_EXAMPLE }
                  </SyntaxHighlighter>
                  <p>
                    <code>isExpanded</code> already maps to the <code>aria-expanded</code> attribute,
                    but its intended value of <code>true</code> will get overwritten due to <code>buttonProps</code>.
                    The order of how the props are passed to <code>&lt;BaseAccordionHeader&gt;</code> doesn&apos;t
                    matter because it doesn&apos;t affect how <code>&lt;BaseAccordionHeader&gt;</code> passes
                    that information to the underlying HTML element.
                  </p>
                </td>
              </tr>
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
                    meet
                    { ' ' }
                    <a href="https://www.w3.org/TR/WCAG22/#parsing">
                      Success Criterion 4.4.1
                    </a>
                    { ' ' }
                    of the WCAG 2.2 guidelines.
                  </p>
                  <p>
                    See the
                    { ' ' }
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">
                      MDN Web Docs
                    </a>
                    { ' ' }
                    for more information.
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
                    A unique identifier pointing to the corresponding accordion panel. Maps to
                    the <code>aria-controls</code> attribute.
                  </p>
                  <p>
                    This means that the accordion panel should also have
                    an HTML <code>id</code> attribute with the same value (e.g. giving
                    a <code>&lt;BaseAccordionPanel&gt;</code> an <code>id</code> prop).
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>headerLevel</code></td>
                <td><code>number</code></td>
                <td><code>undefined</code></td>
                <td>{ '\u2713' }</td>
                <td>
                  <p>
                    A number from 1 to 6 (inclusive) representing an HTML section heading element
                    (e.g. <code>&lt;h2&gt;</code>).
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>headerProps</code></td>
                <td><code>{ '{ [key: string]: any }' }</code></td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  <p>
                    An object that is spread over the underlying heading element in order to
                    supply props and HTML attributes to it. For example, one can provide custom styling
                    with:
                  </p>
                  <SyntaxHighlighter language="jsx">
                    { HEADER_PROPS_EXAMPLE }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr>
                <td><code>id</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>(see description)</td>
                <td>
                  <p>
                    A unique identifier for the underlying button. Maps
                    to the HTML <code>id</code> attribute.
                  </p>
                  <p>
                    Note that if the HTML element representing the corresponding accordion panel has
                    the <code>region</code> role, then the panel must be labeled. This is
                    ideally done by giving the panel an <code>aria-labelledby</code> attribute
                    that points to the button.
                  </p>
                  <p>
                    Accordion panels are NOT required to have the <code>region</code> role,
                    but <code>&lt;BaseAccordionPanel&gt;</code> defaults to
                    the <code>&lt;section&gt;</code> element, which has the <code>region</code> role.
                    In other words, if you are using <code>&lt;BaseAccordionPanel&gt;</code>, by default,
                    you must provide an <code>id</code> prop
                    to <code>&lt;BaseAccordionHeader&gt;</code> and a <code>labelId</code> prop
                    to <code>&lt;BaseAccordionPanel&gt;</code> using the same values.
                  </p>
                  <p>
                    See the
                    { ' ' }
                    <a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/#wai-aria-roles-states-and-properties">
                      APG
                    </a>
                    { ' ' }
                    and the
                    { ' ' }
                    <a href="https://w3c.github.io/aria/#region">
                      <code>region</code> specification
                    </a>
                    { ' ' }
                    for more information.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>isDisabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td />
                <td>
                  <p>
                    Used to set the <code>aria-disabled</code> attribute. Communicates to
                    assitive technologies situations where, e.g., the accordion disallows
                    collapsing already-expanded panels.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>isExpanded</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td />
                <td>
                  <p>
                    Used to set the <code>aria-expanded</code> attribute. Note that this attribute
                    does not affect the visibility of the corresponding accordion panel.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>onClick</code></td>
                <td><code>(SyntheticEvent&lt;T&gt;) =&gt; void</code></td>
                <td><code>undefined</code></td>
                <td>{ '\u2713' }</td>
                <td>
                  <p>
                    A click event handler for the underlying button. Should be used
                    to handle expanding/collapsing the accordion panel.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>onKeyDown</code></td>
                <td><code>(SyntheticEvent&lt;T&gt;) =&gt; void</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>
                  <p>
                    A keydown event handler for the underlying button. Primarily used to implement focus management.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="base-accordion-panel">&lt;BaseAccordionPanel&gt;</h4>
        <p>
          <code>&lt;BaseAccordionPanel&gt;</code> is a thin wrapper over basic HTML elements
          designed to help implement accordions according to the APG. It is the
          underlying component for <code>&lt;AccordionPanel&gt;</code>, and can be used for
          custom accordion implementations.
        </p>
        <h5>Props</h5>
        <p>
          This component accepts the following props, and any props not explicitly listed here
          will be spread onto the underlying HTML element.
        </p>
        <div className="table-container">
          <table className="table is-hoverable">
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
                    Represents the actual content for a panel. Can be anything renderable
                    by React.
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
                    A unique identifier for the underlying HTML element. Maps
                    to the HTML <code>id</code> attribute.
                  </p>
                  <p>
                    Note that the corresponding accordion header button should also have
                    an <code>aria-controls</code> attribute with the same value (e.g. giving
                    a <code>&lt;BaseAccordionHeader&gt;</code> a <code>controlsId</code> prop).
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>labelId</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>{ '\u2713 (see description)' }</td>
                <td>
                  <p>
                    A unique identifier pointing to the corresponding accordion header button.
                    Maps to the <code>aria-labelledby</code> attribute.
                  </p>
                  <p>
                    Note that if the HTML element representing the accordion panel has
                    the <code>region</code> role, then the panel must be labeled. This is
                    ideally done by giving the panel an <code>aria-labelledby</code> attribute
                    that points to the corresponding accordion header button.
                  </p>
                  <p>
                    Accordion panels are NOT required to have the <code>region</code> role,
                    but <code>&lt;BaseAccordionPanel&gt;</code> defaults to
                    the <code>&lt;section&gt;</code> element, which has the <code>region</code> role.
                    In other words, by default, you must provide a <code>labelId</code> prop
                    to <code>&lt;BaseAccordionPanel&gt;</code> and the corresponding
                    accordion header panel an HTML <code>id</code> attribute using the same values.
                  </p>
                  <p>
                    See the
                    { ' ' }
                    <a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/#wai-aria-roles-states-and-properties">
                      APG
                    </a>
                    { ' ' }
                    and the
                    { ' ' }
                    <a href="https://w3c.github.io/aria/#region">
                      <code>region</code> specification
                    </a>
                    { ' ' }
                    for more information.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>tagName</code></td>
                <td><code>string</code></td>
                <td><code>&apos;section&apos;</code></td>
                <td />
                <td>
                  <p>
                    A string representing what the underlying HTML element will be rendered as.
                    Because this prop defaults to an element with the <code>region</code> role,
                    the <code>labelId</code> prop is also required by default.
                  </p>
                  <p>
                    However, the underlying HTML element does NOT need to have the
                    role <code>region</code>. According to the APG:
                  </p>
                  <blockquote cite="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">
                    Avoid using the <code>region</code> role in circumstances that create landmark
                    region proliferation, e.g. in an accordion that contains more than approximately
                    6 panels that can be expanded at the same time.
                  </blockquote>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

AccordionPage.SubNav = SubNav;

export default AccordionPage;
