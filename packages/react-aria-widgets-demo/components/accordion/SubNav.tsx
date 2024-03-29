//Components and Styles
import styles from './SubNav.module.scss';

export default function SubNav() {
  return (
    <nav className={ `${styles.SubNav} menu is-size-7` }>
      <p className="menu-label">
        Contents
      </p>
      <ul className="menu-list">
        <li>
          <a href="#usage-and-examples">Usage and Examples</a>
          <ul>
            <li><a href="#basic-usage">Basic Usage</a></li>
            <li><a href="#disable-multiple-expanded">Disable Multiple Expanded Sections</a></li>
            <li><a href="#disable-collapsing-all">Disable Collapsing All Sections</a></li>
            <li><a href="#disable-both">Disabling <code>allowMultiple</code> and <code>allowCollapseLast</code></a></li>
            <li><a href="#render-prop">Rendering With Render Props</a></li>
            <li><a href="#disabling-items">Prevent Expanding/Collapsing Accordion Items</a></li>
            <li><a href="#initialize-state">Initialize Expanded/Disabled State</a></li>
            <li><a href="#focusing-items">Focusing Items</a></li>
            <li><a href="#state-change-callbacks">Callbacks on State Changes</a></li>
            <li><a href="#controlling-state">Controlling State</a></li>
            <li><a href="#styling">Styling</a></li>
            <li><a href="#further-customization">Further Customization</a></li>
          </ul>
        </li>
        <li>
          <a href="#api">API</a>
          <ul>
            <li>
              <a href="#components">Components</a>
              <ul>
                <li><a href="#accordion-component">&lt;Accordion&gt;</a></li>
                <li><a href="#accordion-item">&lt;AccordionItem&gt;</a></li>
                <li><a href="#controlled-accordion">&lt;ControlledAccordion&gt;</a></li>
                <li><a href="#accordion-header">&lt;AccordionHeader&gt;</a></li>
                <li><a href="#accordion-panel">&lt;AccordionPanel&gt;</a></li>
                <li><a href="#base-accordion-header">&lt;BaseAccordionHeader&gt;</a></li>
                <li><a href="#base-accordion-panel">&lt;BaseAccordionPanel&gt;</a></li>
              </ul>
            </li>
            <li>
              <a href="#hooks">Hooks</a>
              <ul>
                <li><a href="#use-accordion">useAccordion</a></li>
                <li><a href="#use-accordion-context">useAccordionContext</a></li>
                <li><a href="#use-accordion-item-context">useAccordionItemContext</a></li>
              </ul>
            </li>
            <li>
              <a href="#contexts">Contexts</a>
              <ul>
                <li><a href="#accordion-context">AccordionContext</a></li>
                <li><a href="#accordion-item-context">AccordionItemContext</a></li>
              </ul>
            </li>
            <li>
              <a href="#types">Types</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
