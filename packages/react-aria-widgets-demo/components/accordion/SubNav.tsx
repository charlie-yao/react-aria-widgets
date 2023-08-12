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
            <li><a href="#customization">Customization</a></li>
          </ul>
        </li>
        <li>
          <a href="#api">API</a>
          <ul>
            <li>
              <a href="#hocs-and-hooks">Higher-Order Components and Hooks</a>
              <ul>
                <li>
                  <a href="#with-accordion-manager">
                    withAccordionManager()
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#components">Components</a>
              <ul>
                <li>
                  <a href="#accordion-component">
                    &lt;Accordion&gt;
                  </a>
                </li>
                <li>
                  <a href="#accordion-section">
                    &lt;AccordionSection&gt;
                  </a>
                </li>
                <li>
                  <a href="#accordion-header">
                    &lt;AccordionHeader&gt;
                  </a>
                </li>
                <li>
                  <a href="#accordion-panel">
                    &lt;AccordionPanel&gt;
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#base-components">Base Components</a>
              <ul>
                <li>
                  <a href="#base-accordion-header">
                    &lt;BaseAccordionHeader&gt;
                  </a>
                </li>
                <li>
                  <a href="#base-accordion-panel">
                    &lt;BaseAccordionPanel&gt;
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
