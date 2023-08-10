import Link from 'next/link';

export default function HomePage() {
  return (
    <article className="container is-max-desktop content">
      <h1>React ARIA Widgets</h1>
      <p>
        React ARIA Widgets is a collection of React primitives designed
        to help developers implement the patterns found in
        the <a href="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices Guide (APG)</a>.
      </p>
      <p className="notification is-light is-info">
        Please note that this library should <strong>NOT</strong> be used in a production environment! It's
        still in a pre-alpha stage and the API is subject to major breaking changes.
      </p>
      <h2>Features</h2>
      <ul>
        <li>
          Unstyled, accessible components and hooks that provide functionality and are easily composable and customizable
        </li>
        <li>
          Unopinionated stateless components that provide typings to dictate the necessary HTML/ARIA attributes
          for developers who need greater control
        </li>
        <li>
          Adheres to the APG complete with focus control and full keyboard support.
        </li>
      </ul>
    </article>
  );
}
