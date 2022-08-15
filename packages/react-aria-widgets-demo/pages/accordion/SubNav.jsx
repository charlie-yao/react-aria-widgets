//Components and Styles
import styles from './SubNav.module.scss';

export default function SubNav() {
	return (
		<nav className={ `${styles.SubNav} menu is-size-7` }>
			<ul className="menu-list">
				<li>
					<a href="#accordion">Accordion</a>
				</li>
				<li>
					<a href="#usage-and-examples">Usage and Examples</a>
					<ul>
						<li>
							<a href="#basic-usage">Basic Usage</a>
						</li>
						<li>
							<a href="#customization">Customization</a>
						</li>
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
										<code>withAccordionManager()</code>
									</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#components">Components</a>
							<ul>
								<li>
									<a href="#accordion-component">
										<code>&lt;Accordion&gt;</code>
									</a>
								</li>
								<li>
									<a href="#accordion-section">
										<code>&lt;AccordionSection&gt;</code>
									</a>
								</li>
								<li>
									<a href="#accordion-header">
										<code>&lt;AccordionHeader&gt;</code>
									</a>
								</li>
								<li>
									<a href="#accordion-panel">
										<code>&lt;AccordionPanel&gt;</code>
									</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#base-components">Base Components</a>
							<ul>
								<li>
									<a href="#base-accordion-header">
										<code>&lt;BaseAccordionHeader&gt;</code>
									</a>
								</li>
								<li>
									<a href="#base-accordion-panel">
										<code>&lt;BaseAccordionPanel&gt;</code>
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
