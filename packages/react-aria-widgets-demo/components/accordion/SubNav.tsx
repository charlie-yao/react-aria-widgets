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
            <li><a href="#disabling-items">Disabling Accordion Items</a></li>
            <li><a href="#initialize-state">Initialize Expanded/Disabled State</a></li>
            <li><a href="#focusing-items">Focusing Items</a></li>
            <li><a href="#state-change-callbacks">Callbacks on State Changes</a></li>
            <li><a href="#controlling-state">Controlling State</a></li>
            <li><a href="#styling">Styling</a></li>
            <li><a href="#further-customization">Further Customization</a></li>
            <li><a href="#customization">Customization</a></li>
          </ul>
        </li>
        <li>
          <a href="#api">API</a>
          <ul>
            <li>
              <a href="#hocs-and-hooks">Higher-Order Components and Hooks</a>
              <ul>
                <li><a href="#with-accordion-manager"><code>withAccordionManager</code></a></li>
              </ul>
            </li>
            <li>
              <a href="#components">Components</a>
              <ul>
                <li><a href="#accordion-component"><code>&gt;Accordion&gt;</code></a></li>
                <li><a href="#accordion-section"><code>&lt;AccordionSection&gt;</code></a></li>
                <li><a href="#accordion-header"><code>&lt;AccordionHeader&gt;</code></a></li>
                <li><a href="#accordion-panel"><code>&lt;AccordionPanel&gt;</code></a></li>
              </ul>
            </li>
            <li>
              <a href="#base-components">Base Components</a>
              <ul>
                <li><a href="#base-accordion-header"><code>&lt;BaseAccordionHeader&gt;</code></a></li>
                <li><a href="#base-accordion-panel"><code>&lt;BaseAccordionPanel&gt;</code></a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
