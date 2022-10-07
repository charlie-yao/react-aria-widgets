# React ARIA Widgets

React ARIA Widgets is a collection of React components designed to help developers implement the patterns found in the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/).

Please note that this library should **NOT** be used in a production environment! At the time of writing, this project was developed primarily for educational purposes. Though you are free to make issues on this repository, longterm support in the form of additional features, bug fixes, maintenance, or etc. cannot be guaranteed!

See https://www.charlieyao.com/react-aria-widgets for examples and documentation.

## Features

* [(Mostly) unstyled](https://www.charlieyao.com/react-aria-widgets/support#faq-mostly-unstyled) components that are easily composable and customizable
* Modular design that abstracts stateful logic into higher-order components (HOCs) and React hooks
* Unopinionated ["base" components](https://www.charlieyao.com/getting-started#base-components) that exist primarily to document the necessary HTML elements and ARIA attributes for developers who wish to write their own implementations
* Adheres to the APG complete with focus control and full keyboard support

## Installation

With npm:

```bash
npm install react-aria-widgets
```

With Yarn:

```bash
yarn add react-aria-widgets
```

## Usage

React ARIA Widgets provides two "flavors" of components. One flavor consists of "ready-to-use" components with the intention being that developers can simply provide their own styling and then drop them into their website. If state management logic is needed to fully satisfy the APG, React ARIA Widgets will provide it.

If you wish to use the "ready-to-use" components, you must first import the stylesheet provided by React ARIA Widgets. Though the provided components are mostly unstyled, some default styling is still used. If you're using webpack, it's as easy as:

```jsx
import 'react-aria-widgets/styles.css';
```

From here, you can simply import and use whichever components that you need.

```jsx
import {
	Accordion,
	AccordionSection,
	AccordionHeader,
	AccordionPanel,
} from 'react-aria-widgets/accordion';

export default function MyAccordion() {
	return (
		<Accordion headerLevel={ 2 }>
			<AccordionSection id="section-1">
				<AccordionHeader>
					Hello world!
				</AccordionHeader>
				<AccordionPanel>
					Goodbye!
				</AccordionPanel>
			</AccordionSection>
			<AccordionSection id="section-2">
				<AccordionHeader>
					Hello world!
				</AccordionHeader>
				<AccordionPanel>
					Goodbye!
				</AccordionPanel>
			</AccordionSection>
		</Accordion>
	);
}
```

The other flavor consists of what React ARIA WIdgets calls "base components". Unlike the "ready-to-use" components, which may come with higher-order components, hooks, event management logic, etc., these base components are simply thin wrappers over basic HTML elements and use PropTypes to dictate which HTML and ARIA attributes are necessarily to satisfy the APG. For developers who wish to have finer control (or even write their own implementations) and are simply looking for "guide rails", these base components may be more preferable to them.

Documentation for each component, HOC, hook, etc. can be found on https://www.charlieyao.com/react-aria-widgets.

**NOTE: If you're using [Next.js](https://nextjs.org), the components may need to be [lazy loaded](https://www.charlieyao.com/react-aria-widgets/support#next-js-lazy-load)!

---

Icons provided by Font Awesome Free 6.2.0 - https://fontawesome.com

License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
