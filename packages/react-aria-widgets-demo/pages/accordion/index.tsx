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

const DEFAULT_STYLING_EXAMPLE =
`/*
 * .react-aria-widgets-accordion-panel is a CSS class provided by default,
 * and React ARIA Widgets exposes the accordion's state via HTML attributes
 * so they can be targeted with CSS.
 */
.react-aria-widgets-accordion-panel[data-expanded=false] {
  display: none;
}`;

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
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
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
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
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
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
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
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item2">
        <AccordionHeader>
          Accordion Item 2
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="item3">
        <AccordionHeader>
          Accordion Item 3
        </AccordionHeader>
        <AccordionPanel>
          <p className="mb-4">Hello world!</p>
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
              <ul className="mb-4">
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
              <button className="button is-primary mb-4" type="button" onClick={ () => toggleDisabled(id) }>
                { getIsDisabled(id) ? 'Enable' : 'Disable' } Item
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

function InitializeStateAccordion() {
  return (
    <Accordion
      headerLevel={ 4 }
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
            <ul className="mb-4">
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
            Accordion Item { index + 1 }: ID = <code>{ id }</code>
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
    <form className="mb-4" onSubmit={ (e) => { e.preventDefault(); focusItemId(inputItemId); } }>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" htmlFor={ \`$\{id}-focus-input\` }>
            Item ID:
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                id={ \`$\{id}-focus-input\` }
                type="text"
                onChange={ (e) => setInputItemId(e.target.value) }
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Focus Item
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button" type="button" onClick={ () => focusFirstItem() }>
            Focus First Item
          </button>
        </div>
        <div className="control">
          <button className="button" type="button" onClick={ () => focusPrevItem(id) }>
            Focus Previous Item
          </button>
        </div>
        <div className="control">
          <button className="button" type="button" onClick={ () => focusNextItem(id) }>
            Focus Next Item
          </button>
        </div>
        <div className="control">
          <button className="button" type="button" onClick={ () => focusLastItem() }>
            Focus Last Item
          </button>
        </div>
      </div>
    </form>
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
              <button className="button is-primary mb-4" type="button" onClick={ () => toggleDisabled(id) }>
                { getIsDisabled(id) ? 'Enable' : 'Disable' } Item
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
      <div className="control" key={ id }>
        <button
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
      <div className="control" key={ id }>
        <button
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
      <div className="control" key={ id }>
        <button
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
          <p className="mb-4">Hello world!</p>
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <>
      <form onSubmit={ e => e.preventDefault() } style={{ paddingBottom: '1rem' }}>
        <fieldset className="field is-grouped">
          <legend className="has-text-weight-semibold">Expand/Collapse Items</legend>
          { toggleExpandButtons }
        </fieldset>
        <fieldset className="field is-grouped">
          <legend className="has-text-weight-semibold">Enable/Disable Items</legend>
            { toggleDisableButtons }
          </fieldset>
        <fieldset className="field is-grouped">
          <legend className="has-text-weight-semibold">Focus Items</legend>
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

const CUSTOM_ACCORDION_EXAMPLE =
`import { useAccordion, ControlledAccordion } from 'react-aria-widgets/accordion';

function CustomAccordion({
  children = null,
  ...rest
}) {
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
        className="button is-primary my-accordion-button is-flex is-align-items-baseline has-text-right"
        id={ id }
        onClick={ onClick }
        onKeyDown={ onKeyDown }
        aria-controls={ \`$\{id}-panel\` }
        aria-expanded={ isExpanded }
        aria-disabled={ isDisabled }
        ref={ refCallback }
      >
        { children }
        <i
          className={ \`fa-solid fa-chevron-$\{isExpanded ? 'down' : 'right'} is-flex-grow-1\` }
          aria-hidden="true"
        />
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
      className={ \`my-accordion-panel $\{isExpanded ? 'expanded' : 'collapsed'} content\` }
    >
      { children }
    </section>
  );
}`;

const CUSTOM_ACCORDION_STYLES_EXAMPLE =
`.my-accordion-header {
  margin-bottom: 1rem;
}

.my-accordion-button {
  width: 100%;
}

.my-accordion-panel.collapsed {
  display: none;
}`;

const MY_ACCORDION_EXAMPLE =
`import CustomAccordion from './CustomAccordion';
import CustomAccordionHeader from './CustomAccordionHeader';
import CustomAccordionPanel from './CustomAccordionPanel';

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

const MDN_DISABLED_LINK = 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled';

const BUTTON_SPEC_LINK = 'https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element';

const ON_FOCUS_CHANGE_TYPE =
`(args: {
  elem: HTMLButtonElement | HTMLElement | null;
  index: number;
  id: string;
}) => void;`;

const ACCORDION_PROPS = `type AccordionProps = React.PropsWithChildren<UseAccordionOptions>;`;

const ACCORDION_ITEM_PROPS = `type AccordionItemProps = React.PropsWithChildren<{ id: string }>;`;

const CUSTOM_ACCORDION_PROPS =
`type CustomAccordionProps = React.PropsWithChildren<{
  contextValue: AccordionMembers;
}>;`

const ACCORDION_HEADER_PROPS =
`interface AccordionHeaderProps {
  children?: React.ReactNode | AccordionRenderFunction;
  headerProps?: AccordionHeaderElementProps;
  buttonProps?: AccordionButtonElementProps;
}`;

const ACCORDION_HEADER_ELEMENT_PROPS =
`type AccordionHeaderElementProps = {
  className?: string | AccordionRenderClass;
  style?: React.CSSProperties | AccordionRenderStyle;
} & Omit<
  BaseAccordionHeaderElementProps,
  'className' | 'style'
>;`;

const ACCORDION_BUTTON_ELEMENT_PROPS =
`type AccordionButtonElementProps = {
  className?: string | AccordionRenderClass;
  style?: React.CSSProperties | AccordionRenderStyle;
} & Omit<
  BaseAccordionButtonElementProps,
  'className' | 'style'
>;`;

const ACCORDION_PANEL_PROPS =
`type AccordionPanelProps<
  C extends React.ElementType = 'section'
> = PolymorphicComponentPropsWithoutRef<
  C,
  {
    children?: React.ReactNode | AccordionRenderFunction;
    className?: string | AccordionRenderClass;
    style?: React.CSSProperties | AccordionRenderStyle;
  }
>;`;

const BASE_ACCORDION_HEADER_PROPS =
`type BaseAccordionHeaderProps = React.PropsWithChildren<{
  id?: string;
  headerLevel: 1 | 2 | 3 | 4 | 5 | 6;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  'aria-controls': string;
  'aria-expanded': boolean;
  'aria-disabled': boolean;
  headerProps?: BaseAccordionHeaderElementProps;
  buttonProps?: BaseAccordionButtonElementProps;
}>;`;

const BASE_ACCORDION_HEADER_ELEMENT_PROPS =
`type BaseAccordionHeaderElementProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'children' | 'dangerouslySetInnerHTML'
>;`;

const BASE_ACCORDION_BUTTON_ELEMENT_PROPS =
`type BaseAccordionButtonElementProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' |
  'dangerouslySetInnerHTML' |
  'type' |
  'id' |
  'aria-controls' |
  'onClick' |
  'onKeyDown' |
  'aria-expanded' |
  'aria-disabled'
>;`;

const USE_ACCORDION_OPTIONS =
`interface UseAccordionOptions {
  allowMultiple?: boolean;
  allowCollapseLast?: boolean;
  headerLevel: 1 | 2 | 3 | 4 | 5 | 6;
  initialExpanded?: string[];
  initialDisabled?: string[];
  onToggleExpanded?: (expandedItems: Set<string>) => void;
  onToggleDisabled?: (disabledItems: Set<string>) => void;
  onFocusChange?: ({
    elem,
    index,
    id
  }: {
    elem: HTMLButtonElement | HTMLElement | null;
    index: number;
    id: string;
  }) => void;
}`;

const ACCORDION_MEMBERS = `type AccordionMembers = ReturnType<typeof useAccordion>;`;

const ACCORDION_ITEM_CONTEXT_TYPE =
`interface AccordionItemContextType {
  id: string;
  headerHTMLId: string;
  panelHTMLId: string;
}`;

const ACCORDION_RENDER_FUNCTION =
`type AccordionRenderFunction = (args: AccordionMembers & AccordionItemContextType) => React.ReactNode;`;

const ACCORDION_RENDER_CLASS = `type AccordionRenderClass = (args: AccordionRenderStyleData) => string;`;

const ACCORDION_RENDER_STYLE = `type AccordionRenderStyle = (args: AccordionRenderStyleData) => React.CSSProperties;`;

const ACCORDION_RENDER_STYLE_DATA =
`interface AccordionRenderStyleData {
  allowMultiple: boolean;
  allowCollapseLast: boolean;
  headerLevel: 1 | 2 | 3 | 4 | 5 | 6;
  isExpanded: boolean;
  isDisabled: boolean;
}`;

function AccordionPage() {
  return (
    <>
      <Head>
        <title>Accordion - React ARIA Widgets</title>
      </Head>
      <article className="content container is-max-desktop">
        <h1 id="accordion">
          Accordion
        </h1>
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
        <h2 id="usage-and-examples">
          Usage and Examples
        </h2>
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
          Additionally, because these components come with no styling, they will not have the proper
          expand/collapse behavior out of the box. For the sake of demonstrating the proper behavior, the
          examples on this page will be given the following styles:
        </p>
        <SyntaxHighlighter language="css">
          { DEFAULT_STYLING_EXAMPLE }
        </SyntaxHighlighter>
        <p>For more information, see the <a href="#styling">styling section</a>.
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
          Out of the box, React ARIA Widgets provides the focus control as described in the APG. You can
          use <kbd>ArrowDown</kbd>, <kbd>ArrowUp</kbd>, <kbd>Home</kbd>, and <kbd>End</kbd> to
          switch focus between each item.
        </p>
        <p>
          A <code>headerLevel</code> prop must be supplied to the <code>&lt;Accordion&gt;</code>,
          and each <code>&lt;AccordionItem&gt;</code> must have a unique (amongst its siblings) <code>id</code> prop.
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
          of the fields and methods that pertain to the accordion.
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
          <li><code>onToggleExpanded</code> - receives the items that are expanded</li>
          <li><code>onToggleDisabled</code> - receives the items that are disabled</li>
          <li><code>onFocusItem</code> - receives the item that was focused</li>
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
          As previously demonstrated, state can be manually controlled from &quot;below&quot; the accordion by using
          render props. One could also create custom implementations
          of <code>&lt;AccordionHeader</code> or <code>&lt;AccordionPanel&gt;</code> by using the
          hooks <code>useAccordionContext</code> and <code>useAccordionItemContext</code>.
        </p>
        <p>
          State can be controlled from &quot;above&quot; the accordion by using <code>useAccordion</code>, a hook
          that provides methods to manage the state, and <code>&lt;ControlledAccordion&gt;</code>, a thin
          wrapper over the context provider that passes those methods down. Unlike <code>&lt;Accordion&gt;</code>,
          <code>&lt;ControlledAccordion&gt;</code> doesn't call <code>useAccordion</code> internally, allowing
          you to choose where to use it.
        </p>
        <RemoteControlAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { REMOTE_CONTROL_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="styling">
          Styling
        </h3>
        <p>
          There are a few different ways to style <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code>:
        </p>
        <ul>
          <li>Write CSS that targets the default classes applied by React ARIA Widgets</li>
          <li>Supply a function for <code>className</code> that receives state and returns a string</li>
          <li>Supply a string for <code>className</code> </li>
          <li>Supply a function for <code>style</code> that receives state and returns an object</li>
          <li>Supply an object for <code>style</code></li>
        </ul>
        <p>
          And, as previously alluded to, you can dynamically style your content by using a render function
          to render your content.
        </p>
        <p>
          There are a few things to note when styling your content:
        </p>
        <ul>
          <li>
            If you supply a string or function for <code>className</code>, it will replace the default class
            rather than append to it
          </li>
          <li>
            React ARIA Widgets exposes the accordion's state onto the DOM using various HTML attributes,
            allowing them to be targeted with CSS selectors
          </li>
          <li>
            If you wish you use the <code>hidden</code> attribute to collapse your panels, unfortunately React ARIA
            Widgets currently does not have a good API for doing so. You can create your own accordion
            panel implementation using the hooks provided, but that&apos;s an admittedly awkward workaround.
            It&apos;s arguable though that in most cases, using <code>display: none;</code> has better semantics
            than <code>hidden</code>. For more information, see
            the <Link href="/support#faq-hidden-vs-display-none">FAQ</Link>.
          </li>
        </ul>
        <div className="table-container">
          <table className="table is-striped is-hoverable">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">HTML Element</th>
                <th scope="col">Default CSS Class</th>
                <th scope="col">State Selector</th>
                <th scope="col">Selector Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={ 2 }>
                  <code>&lt;AccordionHeader&gt;</code>
                </td>
                <td rowSpan={ 2 }>
                  <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>
                </td>
                <td rowSpan={ 2 }>
                  <code>react-aria-widgets-accordion-header</code>
                </td>
                <td><code>[data-expanded=true | false]</code></td>
                <td>Whether the panel is expanded or collapsed.</td>
              </tr>
              <tr>
                <td><code>[data-disabled=true | false]</code></td>
                <td>Whether toggling visibility is enabled or disabled.</td>
              </tr>
              <tr>
                <td rowSpan={ 2 }>
                  <code>&lt;AccordionHeader&gt;</code>
                </td>
                <td rowSpan={ 2 }>
                  <code>&lt;button&gt;</code>
                </td>
                <td rowSpan={ 2 }>
                  <code>react-aria-widgets-accordion-button</code>
                </td>
                <td><code>[aria-expanded=true | false]</code></td>
                <td>Whether the panel is expanded or collapsed.</td>
              </tr>
              <tr>
                <td><code>[aria-disabled=true | false]</code></td>
                <td>Whether toggling visibility is enabled or disabled.</td>
              </tr>
              <tr>
                <td rowSpan={ 2 }>
                  <code>&lt;AccordionPanel&gt;</code>
                </td>
                <td rowSpan={ 2 }>
                  <code>&lt;section&gt;</code> by default
                </td>
                <td rowSpan={ 2 }>
                  <code>react-aria-widgets-accordion-panel</code>
                </td>
                <td><code>[data-expanded=true | false]</code></td>
                <td>Whether the panel is expanded or collapsed.</td>
              </tr>
              <tr>
                <td><code>[data-disabled=true | false]</code></td>
                <td>Whether toggling visibility is enabled or disabled.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The rendered markup looks something like this:
        </p>
        <SyntaxHighlighter language="tsx">
          { ACCORDION_HTML_MARKUP_EXAMPLE }
        </SyntaxHighlighter>
        <p>
          In the following example, each of the accordion items are styled using one of the provided methods.
        </p>
        <StyledAccordion headerLevel={ 4 } />
        <SyntaxHighlighter language="tsx">
          { STYLED_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <SyntaxHighlighter language="css">
          { STYLED_ACCORDION_CSS_EXAMPLE }
        </SyntaxHighlighter>
        <h3 id="further-customization">
          Further Customization
        </h3>
        <p>
          React ARIA Widgets exposes all of the hooks, contexts, components, etc. that it uses, allowing you to
          create your own accordion implementations.
        </p>
        <h4>Creating a Custom <code>&lt;Accordion&gt;</code></h4>
        <p>
          As mentioned in <a href="#controlling-state">Controlling State</a>, one can simply
          combine <code>useAccordion</code> and <code>&lt;ControlledAccordion&gt;</code> to create a
          new version of <code>&lt;Accordion&gt;</code>.
        </p>
        <SyntaxHighlighter language="tsx">
          { CUSTOM_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h4>Creating Custom Headers and Panels</h4>
        <p>
          You can use the hook <code>useAccordionContext</code> to read and modify the accordion state that
          gets sent down from <code>&lt;ControlledAccordion&gt;</code>. We&apos;ll be using it to create our own
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
        <SyntaxHighlighter language="css">
          { CUSTOM_ACCORDION_STYLES_EXAMPLE }
        </SyntaxHighlighter>
        <h4>Putting It All Together</h4>
        <p>
          You&apos;ll notice that we didn&apos;t create another version of <code>&lt;AccordionItem&gt;</code>. Its main
          job is to make sure that the header and panel both have the same ID, and we won't need that in this example.
        </p>
        <p>
          Here&apos;s the completed accordion:
        </p>
        <MyAccordion headerLevel={ 5 } />
        <SyntaxHighlighter language="tsx">
          { MY_ACCORDION_EXAMPLE }
        </SyntaxHighlighter>
        <h2 id="api">
          API
        </h2>
        <h3 id="components">
          Components
        </h3>
        <h4 id="accordion-component">
          &lt;Accordion&gt;
        </h4>
        <p>
          Provides accordion state and functionality to its constituent components. It passes this data
          down to child components via the context API, which can be read with the hook <code>useAccordionContext</code>.
        </p>
        <h5>Props</h5>
        <p>
          The type definition for this component's props are exported as <code>AccordionProps</code>.
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
                <td><code>React.ReactNode</code></td>
                <td><code>null</code></td>
                <td />
                <td>
                  React nodes that represent the accordion&apos;s constituent headers and panels. Does
                  not have to be the components provided by React ARIA Widgets.
                </td>
              </tr>
              <tr>
                <td><code>allowMultiple</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td />
                <td>Determines whether or not multiple accordion items can be expanded at the same time.</td>
              </tr>
              <tr>
                <td><code>allowCollapseLast</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td />
                <td>Determines whether or not the last expanded panel can be collapsed.</td>
              </tr>
              <tr>
                <td><code>headerLevel</code></td>
                <td><code>1 | 2 | 3 | 4 | 5 | 6</code></td>
                <td></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>Determines the HTML heading element (e.g. <code>&lt;h1&gt;</code>) of each accordion header.</td>
              </tr>
              <tr>
                <td><code>initialExpanded</code></td>
                <td><code>string[]</code></td>
                <td><code>[]</code></td>
                <td />
                <td>
                  Determines which accordion items (identified by their ID) should be expanded on the
                  initial mount. If <code>allowMultiple</code> is off, the first element in the array
                  is picked naively.
                </td>
              </tr>
              <tr>
                <td><code>initialDisabled</code></td>
                <td><code>string[]</code></td>
                <td><code>[]</code></td>
                <td />
                <td>
                  Determines which accordion items (identified by their ID) should be prevented from
                  expanding or collapsing on the initial mount.
                </td>
              </tr>
              <tr>
                <td><code>onToggleExpanded</code></td>
                <td><code>(expandedItems: Set&lt;string&gt;) =&gt; void;</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>
                  Callback to be fired after an item is expanded or collapsed. Receives the currently-expanded
                  item IDs as an argument.
                </td>
              </tr>
              <tr>
                <td><code>onToggleDisabled</code></td>
                <td><code>(disabledItems: Set&lt;string&gt;) =&gt; void;</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>
                  Callback to be fired after an item is enabled/disabled. Receives the currently-disabled
                  item IDs as an argument.
                </td>
              </tr>
              <tr>
                <td><code>onFocusItem</code></td>
                <td><code>{ ON_FOCUS_CHANGE_TYPE }</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>
                  Callback to be fired after an item receives focus. Note that this only runs when using
                  one of the focus methods provided by <code>useAccordion</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="accordion-item">
          &lt;AccordionItem&gt;
        </h4>
        <p>
          Represents a header/panel pair. Helps ensure that they both have the same ID and generates
          HTML IDs for attributes like <code>id</code> and <code>aria-labelledby</code>. Passes
          information down to child components via the context API, which can be read with the
          hook <code>useAccordionItemContext</code>.
        </p>
        <h5>Props</h5>
        <p>
          The type definition for this component's props are exported as <code>AccordionItemProps</code>.
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
                <td><code>React.ReactNode</code></td>
                <td><code>null</code></td>
                <td />
                <td>
                  Technically allows for anything renderable by React, but you should pass in components
                  that represent the accordion&apos;s header and panel
                  (e.g. <code>&lt;AccordionHeader&gt;</code> and <code>&lt;AccordionPanel&gt;</code>).
                </td>
              </tr>
              <tr>
                <td><code>id</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>
                  A string that uniquely identifies this header/panel pair. IDs do not have to be
                  unique globally, but they do have to be unique amongst its siblings.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="controlled-accordion">
          &lt;ControlledAccordion&gt;
        </h4>
        <p>
          Acts similarly to <code>&lt;Accordion&gt;</code> in that its role is to act as a context provider
          for the accordion&apos;s fields and methods. However, unlike <code>&lt;Accordion&gt;</code>, it
          doesn&apos;t use the <code>useAccordion</code> hook, giving you the freedom to choose where to
          use it.
        </p>
        <h5>Props</h5>
        <p>
          The type definition for this component's props are exported as <code>ControlledAccordionProps</code>.
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
                <td><code>contextValue</code></td>
                <td>
                  <a href="#accordion-members"><code className="is-underlined">AccordionMembers</code></a>
                </td>
                <td></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>
                  The object returned by <code>useAccordion</code> (i.e. the accordion's
                  fields and methods).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="accordion-header">
          &lt;AccordionHeader&gt;
        </h4>
        <p>
          Represents the header of an accordion. Receives the fields and methods from the accordion contexts
          by using the <code>useAccordionContext</code> and <code>useAccordionItemContext</code> hooks.
          Implements event handlers to mange focus and expand/collapse its panel&apos;s visibility. Also sets
          the HTML/ARIA attributes needed to fulfill the APG.
        </p>
        <h5>Props</h5>
        <p>
          The type definition for this component's props are exported as <code>AccordionHeaderProps</code>.
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
                <td>
                  <code>React.ReactNode | <a href="#accordion-render-function" className="is-underlined">AccordionRenderFunction</a></code>
                </td>
                <td><code>null</code></td>
                <td />
                <td>
                  <p>
                    The content to be rendered. This can either be a string, component, etc., or
                    a render function.
                  </p>
                  <p>
                    If you provide a render function, it will receive all of the fields and methods
                    provided by <code>useAccordionContext</code> and <code>useAccordionItemContext</code>.
                  </p>
                  <p>
                    Note that because the content is placed inside of a <code>&lt;button&gt;</code>,
                    it must not contain any interactive content or an element with
                    the <code>tabindex</code> attribute specified. See
                    the <a href={ BUTTON_SPEC_LINK }><code>&lt;button&gt;</code> specification</a> for
                    more information.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>headerProps</code></td>
                <td>
                  <a href="#accordion-header-element-props"><code className="is-underlined">AccordionHeaderElementProps</code></a>
                </td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  <p>
                    An object that is spread onto the underlying HTML heading element, allowing you to pass props
                    and attributes to it.
                  </p>
                  <p>
                    You can supply a string or <code>CSSProperties</code> object
                    for <code>headerProps.className</code> or <code>headerProps.style</code> respectively, or
                    you can dynamically apply styles by providing a function. This function will receive
                    accordion state information and should return a string or <code>CSSProperties</code> object.
                  </p>
                  <p>
                    If no <code>className</code> property is supplied, the default value will
                    be <code>react-aria-widgets-accordion-header</code>. If no <code>style</code> property
                    is supplied, the default value will be <code>undefined</code>.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>buttonProps</code></td>
                <td>
                  <a href="#accordion-button-element-props"><code className="is-underlined">AccordionButtonElementProps</code></a>
                </td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  <p>
                    An object that is spread onto the underlying HTML button element, allowing you to pass
                    props and attributes to it.
                  </p>
                  <p>
                    You can supply a string or <code>CSSProperties</code> object
                    for <code>buttonProps.className</code> or <code>buttonProps.style</code> respectively, or
                    you can dynamically apply styles by providing a function. This function will receive
                    accordion state information and should return string or <code>CSSProperties</code> object.
                  </p>
                  <p>
                    If no <code>className</code> property is supplied, the default value will
                    be <code>react-aria-widgets-accordion-button</code>. If no <code>style</code> property
                    is supplied, the default value will be <code>undefined</code>.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Data Attributes</h5>
        <div className="table-container">
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th scope="col">HTML Element</th>
                <th scope="col">Attribute</th>
                <th scope="col">Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={ 2 }><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code></td>
                <td><code>[data-expanded]</code></td>
                <td><code>true | false</code></td>
              </tr>
              <tr>
                <td><code>[data-disabled]</code></td>
                <td><code>true | false</code></td>
              </tr>
              <tr>
                <td rowSpan={ 2 }><code>&lt;button&gt;</code></td>
                <td><code>[aria-expanded]</code></td>
                <td><code>true | false</code></td>
              </tr>
              <tr>
                <td><code>[aria-disabled]</code></td>
                <td><code>true | false</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="accordion-panel">
          &lt;AccordionPanel&gt;
        </h4>
        <p>
          Represents the body of content for an accordion item. Receives the fields and methods from the accordion
          contexts by using the <code>useAccordionContext</code> and <code>useAccordionItemContext</code> hooks.
          Sets the HTML/ARIA attributes needed to fulfill the APG.
        </p>
        <h5>Props</h5>
        <p>
          Note that if you pass any props other than those listed below, they will be spread onto
          the underlying element (i.e. indicated by the <code>as</code> prop).
        </p>
        <p>
          The type definitions for this component's props are exported as <code>AccordionPanelProps</code>.
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
                <td>
                  <code>React.ReactNode | <a href="#accordion-render-function" className="is-underlined">AccordionRenderFunction</a></code>
                </td>
                <td><code>null</code></td>
                <td />
                <td>
                  <p>
                    The content to be rendered. This can either be a string, component, etc., or a render
                    function.
                  </p>
                  <p>
                    If you provide a render function, it will receive all of the fields and methods
                    provided by <code>useAccordionContext</code> and <code>useAccordionItemContext</code>.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td>
                  <code>string | <a href="#accordion-render-class" className="is-underlined">AccordionRenderClass</a></code>
                </td>
                <td><code>react-aria-widgets-accordion-panel</code></td>
                <td />
                <td>
                  A string or function that determines the CSS class. If you supply a function, it
                  will receive state information that will allow you to dynamically set the class.
                </td>
              </tr>
              <tr>
                <td><code>style</code></td>
                <td>
                  <code>React.CSSProperties | <a href="#accordion-render-style" className="is-underlined">AccordionRenderStyle</a></code>
                </td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  An object or function that determines the style attribute. If you supply a function, it
                  will receive state information that will allow you to dynamically apply styles.
                </td>
              </tr>
              <tr>
                <td><code>as</code></td>
                <td><code>React.ElementType</code></td>
                <td><code>&apos;section&apos;</code></td>
                <td />
                <td>
                  <p>
                    Determines the element that will be rendered.
                  </p>
                  <p>
                    Note that the default element <code>&lt;section&gt;</code> has the <code>region</code> role,
                    and that there are times where this may be undesireable. The APG advises:
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
        <h5>Data Attributes</h5>
        <div className="table-container">
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th scope="col">Attribute</th>
                <th scope="col">Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>[data-expanded]</code></td>
                <td><code>true | false</code></td>
              </tr>
              <tr>
                <td><code>[data-disabled]</code></td>
                <td><code>true | false</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="base-accordion-header">
          &lt;BaseAccordionHeader&gt;
        </h4>
        <p>
          A stateless component that represents an accordion header. Exists mainly to provide guardrails to
          help ensure adherence to the APG, namely:
        </p>
        <ul>
          <li>The heading element contains only a button</li>
          <li>The content lives in the button</li>
          <li>Uses TypeScript and PropTypes to remind developers which HTML/ARIA attributes need to be set</li>
        </ul>
        <h5>Props</h5>
        <p>
          The type definition for this component's props are exported as <code>BaseAccordionHeaderProps</code>.
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
                <td><code>React.ReactNode</code></td>
                <td><code>null</code></td>
                <td />
                <td>
                  <p>
                    A string, React component, etc., to be rendered.
                  </p>
                  <p>
                    Note that because the content is placed inside of a <code>&lt;button&gt;</code>,
                    it must not contain any interactive content or an element with
                    the <code>tabindex</code> attribute specified. See
                    the <a href={ BUTTON_SPEC_LINK }><code>&lt;button&gt;</code> specification</a> for
                    more information.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>id</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>(See description)</td>
                <td>
                  <p>
                    The HTML ID for the button element.
                  </p>
                  <p>
                    Note that if the HTML element representing the corresponding accordion panel
                    has the <code>region</code> role, then the panel <strong>must</strong> be labeled.
                    This is ideally done by giving the panel an <code>aria-labelledby</code> attribute
                    that points to the button.
                  </p>
                  <p>
                    Accordion panels in general are not required to have the <code>region</code> role, but
                    the panel components provided by React ARIA Widgets default to <code>&lt;section&gt;</code>,
                    which does have that role. In other words, if you use them with this component,
                    the <code>id</code> will be required by default.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>headerLevel</code></td>
                <td><code>1 | 2 | 3 | 4 | 5 | 6</code></td>
                <td></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>Determines the HTML heading element (e.g. <code>&lt;h1&gt;</code>).</td>
              </tr>
              <tr>
                <td><code>onClick</code></td>
                <td><code>React.MouseEventHandler&lt;HTMLButtonElement&gt;</code></td>
                <td></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>A click event handler for the button. Should handle expanding/collapsing the panel.</td>
              </tr>
              <tr>
                <td><code>onKeyDown</code></td>
                <td><code>React.KeyboardEventHandler&lt;HTMLButtonElement&gt;</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>A keydown event handler for the button. Can be used to provide focus management.</td>
              </tr>
              <tr>
                <td><code>aria-controls</code></td>
                <td><code>string</code></td>
                <td></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>
                  A unique identifier that points to the accordion panel&apos;s HTML ID.
                </td>
              </tr>
              <tr>
                <td><code>aria-expanded</code></td>
                <td><code>boolean</code></td>
                <td />
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>
                  <p>
                    Informs assistive technologies whether or not the panel is expanded.
                  </p>
                  <p>
                    Note that this attribute does not affect the visibility of the panel.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>aria-disabled</code></td>
                <td><code>boolean</code></td>
                <td />
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>
                  <p>
                    Informs assistive technologies if the button cannot be interacted with. A common use-case
                    would be if the associated panel is currently expanded, and the accordion does not allow it to
                    be collapsed (e.g. <code>allowCollapseLast</code> is off and there&apos;s only 1 expanded panel).
                  </p>
                  <p>
                    Note that unlike the <code>disabled</code> attribute, <code>aria-disabled</code> does not
                    actually disable any behaviors such as preventing events from triggering. See
                    the <a href={ MDN_DISABLED_LINK }>MDN Web Docs</a> for more information.
                  </p>
                </td>
              </tr>
              <tr>
                <td><code>headerProps</code></td>
                <td>
                  <a href="#base-accordion-header-element-props"><code className="is-underlined">BaseAccordionHeaderElementProps</code></a>
                </td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  An object that is spread onto the underlying heading element, allowing you to pass props
                  and attributes to it.
                </td>
              </tr>
              <tr>
                <td><code>buttonProps</code></td>
                <td>
                  <a href="#base-accordion-button-element-props"><code className="is-underlined">BaseAccordionButtonElementProps</code></a>
                </td>
                <td><code>{ '{}' }</code></td>
                <td />
                <td>
                  An object that is spread onto the underlying button element, allowing you to pass props
                  and attributes to it.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="base-accordion-panel">
          &lt;BaseAccordionPanel&gt;
        </h4>
        <p>
          A stateless component that represents an accordion panel. Exists mainly to provide guardrails to help
          ensure adherence to the APG, name by using TypeScript and PropTypes to remind developers which
          HTML/ARIA attributes need to be set.
        </p>
        <h5>Props</h5>
        <p>
          Note that if you pass any props other than those listed below, they will be spread onto the
          underlying element (i.e. indicated by the <code>as</code> prop).
        </p>
        <p>
          The type definition for this component's props are exported as <code>BaseAccordionPanelProps</code>.
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
                <td><code>React.ReactNode</code></td>
                <td><code>null</code></td>
                <td />
                <td>The content to be rendered.</td>
              </tr>
              <tr>
                <td><code>as</code></td>
                <td><code>React.ElementType</code></td>
                <td><code>&apos;section&apos;</code></td>
                <td />
                <td>
                  <p>
                    Determines the element that will be rendered. Note that the default
                    element, <code>&lt;section&gt;</code>, has the <code>region</code> role, which has a
                    couple implications.
                  </p>
                  <p>
                    The first is that elements with the <code>region</code> role must be labelled,
                    making <code>aria-labelledby</code> required by default.
                  </p>
                  <p>
                    Second, there are times where the <code>region</code> role may be undesirable.
                    The APG advises:
                  </p>
                  <blockquote cite="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">
                    Avoid using the <code>region</code> role in circumstances that create landmark
                    region proliferation, e.g. in an accordion that contains more than approximately
                    6 panels that can be expanded at the same time.
                  </blockquote>
                </td>
              </tr>
              <tr>
                <td><code>id</code></td>
                <td><code>string</code></td>
                <td></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>
                  The HTML ID for the panel. Note that the corresponding accordion header button should
                  also have an <code>aria-controls</code> attribute that points to this panel.
                </td>
              </tr>
              <tr>
                <td><code>aria-labelledby</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' } (see description)</span>
                  <span className="is-sr-only">Yes by default, see description for details.</span>
                </td>
                <td>
                  <p>
                    A string that points to the accordion header button&apos;s HTML ID.
                  </p>
                  <p>
                    If the HTML element representing the accordion panel has the <code>region</code> role,
                    then it <strong>must</strong> be labeled. Accordion panels in general are not
                    required to have this role, but the default element for this
                    component, <code>&lt;section&gt;</code>, does have the <code>region</code> role.
                    Therefore, this prop is required by default.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 id="hooks">
          Hooks
        </h3>
        <h4 id="use-accordion">
          useAccordion
        </h4>
        <p>
          <code>useAccordion</code> is the hook that provides the state and functionality for the accordion.
          It accepts a number of arguments that help determine the behavior of the accordion, and returns
          fields and methods that get or set the state.
        </p>
        <h5>Arguments</h5>
        <p>
          This hook accepts an object of type <code>UseAccordionOptions</code> that contains the following properties:
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
                <td><code>allowMultiple</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td />
                <td>Controls whether or not multiple panels can be expanded at the same time.</td>
              </tr>
              <tr>
                <td><code>allowCollapseLast</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td />
                <td>Controls whether or not the last expanded panel can be collapsed.</td>
              </tr>
              <tr>
                <td><code>headerLevel</code></td>
                <td><code>1 | 2 | 3 | 4 | 5 | 6</code></td>
                <td></td>
                <td>
                  <span aria-hidden="true">{ '\u2713' }</span>
                  <span className="is-sr-only">Yes</span>
                </td>
                <td>Determines the HTML heading element (e.g. <code>&lt;h1&gt;</code>) of each accordion header.</td>
              </tr>
              <tr>
                <td><code>initialExpanded</code></td>
                <td><code>string[]</code></td>
                <td><code>[]</code></td>
                <td />
                <td>
                  Determines which accordion items (identified by their ID) should be expanded on the
                  initial mount. If <code>allowMultiple</code> is off, the hook naively picks the first
                  element in the array.
                </td>
              </tr>
              <tr>
                <td><code>initialDisabled</code></td>
                <td><code>string[]</code></td>
                <td><code>[]</code></td>
                <td />
                <td>
                  Determines which accordion items (identified by their ID) should be prevented from
                  expanding or collapsing on the initial mount.
                </td>
              </tr>
              <tr>
                <td><code>onToggleExpanded</code></td>
                <td><code>(expandedItems: Set&lt;string&gt;) =&gt; void;</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>
                  Callback to be fired after an item is expanded or collapsed. Receives the currently-expanded
                  item IDs as an argument.
                </td>
              </tr>
              <tr>
                <td><code>onToggleDisabled</code></td>
                <td><code>(disabledItems: Set&lt;string&gt;) =&gt; void;</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>
                  Callback to be fired after an item is enabled/disabled. Receives the currently-disabled
                  item IDs as an argument.
                </td>
              </tr>
              <tr>
                <td><code>onFocusItem</code></td>
                <td><code>{ ON_FOCUS_CHANGE_TYPE }</code></td>
                <td><code>undefined</code></td>
                <td />
                <td>
                  Callback to be fired after an item receives focus. Note that this only runs when using
                  one of the focus methods provided by this hook.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>Return Value</h5>
        <p>
          The type of the returned object is exported as <code>AccordionMembers</code>.
        </p>
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
                <td>Informs downstream components whether or not multiple panels can be expanded at the same time.</td>
              </tr>
              <tr>
                <td><code>allowCollapselast</code></td>
                <td><code>boolean</code></td>
                <td>Informs downstream components whether or not the last expanded panel can be collapsed.</td>
              </tr>
              <tr>
                <td><code>headerLevel</code></td>
                <td><code>1 | 2 | 3 | 4 | 5 | 6</code></td>
                <td>Determines the HTML heading element (e.g. <code>&lt;h1&gt;</code>) of each accordion header.</td>
              </tr>
              <tr>
                <td><code>getIsExpanded</code></td>
                <td><code>(id: string) =&gt; boolean</code></td>
                <td>Returns whether an accordion item is currently expanded.</td>
              </tr>
              <tr>
                <td><code>getIsDisabled</code></td>
                <td><code>(id: string) =&gt; boolean</code></td>
                <td>Returns whether an accordion item is currently prevented from being expanded/collapsed.</td>
              </tr>
              <tr>
                <td><code>toggleExpanded</code></td>
                <td><code>(id: string) =&gt; void</code></td>
                <td>Expands/collapses an accordion item.</td>
              </tr>
              <tr>
                <td><code>toggleDisabled</code></td>
                <td><code>(id: string) =&gt; void</code></td>
                <td>Prevents/allows an accordion item from being expanded/collapsed.</td>
              </tr>
              <tr>
                <td><code>pushItemRef</code></td>
                <td><code>(elem: HTMLButtonElement | HTMLElement | null, id: string) =&gt; void;</code></td>
                <td>
                  Registers an accordion item to the hook. The hook must be aware of each
                  header button in the accordion to manage focus.
                </td>
              </tr>
              <tr>
                <td><code>focusItemIndex</code></td>
                <td><code>(index: number) =&gt; void</code></td>
                <td>
                  Focuses an accordion item based on its index.
                </td>
              </tr>
              <tr>
                <td><code>focusItemId</code></td>
                <td><code>(id: string) =&gt; void</code></td>
                <td>
                  Focuses an accordion item based on its ID.
                </td>
              </tr>
              <tr>
                <td><code>focusPrevItem</code></td>
                <td><code>(id: string) =&gt; void</code></td>
                <td>
                  Focuses the previous accordion item (relative to the supplied ID).
                </td>
              </tr>
              <tr>
                <td><code>focusNextItem</code></td>
                <td><code>(id: string) =&gt; void</code></td>
                <td>
                  Focuses the next accordion item (relative to the supplied ID).
                </td>
              </tr>
              <tr>
                <td><code>focusFirstItem</code></td>
                <td><code>() =&gt; void</code></td>
                <td>
                  Focuses the first accordion item.
                </td>
              </tr>
              <tr>
                <td><code>focusLastItem</code></td>
                <td><code>() =&gt; void</code></td>
                <td>
                  Focuses the last accordion item.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="use-accordion-context">
          useAccordionContext
        </h4>
        <p>
          <code>&lt;Accordion&gt;</code> and <code>&lt;ControlledAccordion&gt;</code> pass down the fields
          and methods from <code>useAccordion</code> via the context API. This hook can be used to read from that
          context provider.
        </p>
        <h5>Arguments</h5>
        <p>This hook doesn&apos;t accept any arguments.</p>
        <h5>Return Value</h5>
        <p>
          This hook has the same return value as <code>useAccordion</code>&apos;s return value, an object of
          type <code>AccordionMembers</code>.
        </p>
        <h4 id="use-accordion-item-context">
          useAccordionItemContext
        </h4>
        <p>
          <code>&lt;AccordionItem&gt;</code> passes down the IDs for its header and panel via
          the context API. This hook can be used to read from that context provider.
        </p>
        <h5>Arguments</h5>
        <p>This hook doesn&apos;t accept any arguments.</p>
        <h5>Return Value</h5>
        <p>
          This hook returns an object of type <code>AccordionItemContextType</code> that contains the following properties:
        </p>
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
                <td>The accordion item&apos;s identifier. Should be unique amongst its sibling items.</td>
              </tr>
              <tr>
                <td><code>headerHTMLId</code></td>
                <td><code>string</code></td>
                <td>
                  A string ID used to identify the accordion header button via attributes
                  like <code>id</code> and <code>aria-labelledby</code>.
                </td>
              </tr>
              <tr>
                <td><code>panelHTMLId</code></td>
                <td><code>string</code></td>
                <td>
                  A string ID used to identify the accordion panel via attributes
                  like <code>id</code> and <code>aria-controls</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 id="contexts">Contexts</h3>
        <h4 id="accordion-context">AccordionContext</h4>
        <p>
          This context provides the fields and methods from <code>useAccordion</code> to consumers
          like <code>useAccordionContext</code>. Chances are, you'll be
          using <code>&lt;Accordion&gt;</code> or <code>&lt;ControlledAccordion&gt;</code> instead of
          importing this directly, but React ARIA Widgets exports it for those who wish to use it.
        </p>
        <p>
          <code>AccordionContext.Provder</code> is also exported as <code>AccordionProvider</code> for
          those who prefer it for aesthetic or other reasons.
        </p>
        <h4 id="accordion-item-context">AccordionItemContext</h4>
        <p>
          This context provides the header and panel IDs from <code>&lt;AccordionItem&gt;</code> to consumers
          like <code>useAccordionItemContext</code>. Chances are, you'll be
          using <code>&lt;AccordionItem&gt;</code> instead, but React ARIA Widgets exports it for those who
          wish to use it.
        </p>
        <p>
          <code>AccordionItemContext.Provider</code> is also exported as <code>AccordionItemProvider</code> for
          those who prefer it for aesthetic or other reasons.
        </p>
        <h3 id="types">
          Types
        </h3>
         <div className="table-container">
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr id="accordion-props">
                <td><code>AccordionProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_PROPS }
                  </SyntaxHighlighter>
                </td> 
              </tr>
              <tr id="accordion-item-props">
                <td><code>AccordionItemProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_ITEM_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="controlled-accordion-props">
                <td><code>ControlledAccordionProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { CUSTOM_ACCORDION_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-header-props">
                <td><code>AccordionHeaderProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_HEADER_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-header-element-props">
                <td><code>AccordionHeaderElementProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_HEADER_ELEMENT_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-button-element-props">
                <td><code>AccordionButtonElementProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_BUTTON_ELEMENT_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-panel-props">
                <td><code>AccordionPanelProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_PANEL_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="base-accordion-header-props">
                <td><code>BaseAccordionHeaderProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { BASE_ACCORDION_HEADER_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="base-accordion-header-element-props">
                <td><code>BaseAccordionHeaderElementProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { BASE_ACCORDION_HEADER_ELEMENT_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="base-accordion-button-element-props">
                <td><code>BaseAccordionButtonElementProps</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { BASE_ACCORDION_BUTTON_ELEMENT_PROPS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="use-accordion-options">
                <td><code>UseAccordionOptions</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { USE_ACCORDION_OPTIONS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-members">
                <td><code>AccordionMembers</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_MEMBERS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-item-context-type">
                <td><code>AccordionItemContextType</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_ITEM_CONTEXT_TYPE }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-render-function">
                <td><code>AccordionRenderFunction</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_RENDER_FUNCTION }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-render-class">
                <td><code>AccordionRenderClass</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_RENDER_CLASS }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-render-style">
                <td><code>AccordionRenderStyle</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_RENDER_STYLE }
                  </SyntaxHighlighter>
                </td>
              </tr>
              <tr id="accordion-render-style-data">
                <td><code>AccordionRenderStyleData</code></td>
                <td>
                  <SyntaxHighlighter language="typescript" customStyle={{ margin: '0', padding: '0.5rem' }}>
                    { ACCORDION_RENDER_STYLE_DATA }
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

AccordionPage.SubNav = SubNav;

export default AccordionPage;
