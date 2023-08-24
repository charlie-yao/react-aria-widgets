# React ARIA Widgets

React ARIA Widgets is a collection of React primitives designed to help developers implement the patterns found in the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/).

Please note that this library should **NOT** be used in a production environment! It's still in a pre-alpha stage and the API is subject to major breaking changes.

See [React ARIA Widgets](https://www.charlieyao.com/react-aria-widgets) for examples and documentation.

## Features

* Unstyled, accessible components that are easily composable and customizable
* Modularized design that gives developers the freedom to choose which hooks, components, etc. they wish to import
* Adheres to the APG complete with focus control and keyboard support

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

React ARIA Widgets provides building blocks for developers to implement their own component libraries. Though it provides features such as accessibility and state management, that alone is insufficient for it to be used out of the box.

For example, certain patterns rely on styling to handle some of the key features that define that pattern. One instance is the accordion pattern - without styles, expanding/collapsing the constituent sections wouldn't behave properly. However, React ARIA Widgets provides **no** default styles.

Still, since React ARIA Widgets already provides state management and aims to maximize compatibility with the variety of CSS libraries, frameworks, etc., in the front-end ecosystem, building fully working implementations of each pattern can be as simple as passing in some `className` props using your framework of choice.

For more information, see [React ARIA Widgets](https://www.charlieyao.com/react-aria-widgets).

---

Icons provided by Font Awesome Free 6.2.0 - https://fontawesome.com

License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
