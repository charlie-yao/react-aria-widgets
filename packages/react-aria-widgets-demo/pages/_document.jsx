/* eslint-disable react/jsx-newline */

import { Html, Head, Main, NextScript } from 'next/document';

const description = 'A collection of React components designed to help developers implement the patterns found in the ARIA Authoring Practices Guide (APG).';

const GOOGLE_ANALYTICS_TAG
= `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={ description } />

        { /* FB Open Graph */ }
        <meta property="og:title" content="React ARIA Widgets" />
        <meta property="og:site_name" content="React ARIA Widgets" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={ description } />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://www.charlieyao.com/react-aria-widgets" />
        <meta property="og:image" content="https://www.charlieyao.com/react-aria-widgets/favicon-512.png" />
        <meta property="og:image:alt" content="Universal Access Icon" />

        { /* Twitter Card */ }
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="React ARIA Widgets" />
        <meta name="twitter:description" content={ description } />
        { /* <meta name="twitter:site" content="@site_account" /> */ }
        { /* <meta name="twitter:creator" content="@individual_account" */ }
        <meta name="twitter:url" content="https://www.charlieyao.com/react-aria-widgets" />
        <meta name="twitter:image" content="https://www.charlieyao.com/react-aria-widgets/favicon-512.png" />
        <meta name="twitter:image:alt" content="Universal Access Icon" />

        { /* Favicons */ }
        <link rel="alternate icon" href="/react-aria-widgets/favicon.ico" sizes="any" />
        <link rel="icon" href="/react-aria-widgets/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/react-aria-widgets/favicon-180.png" />

        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light" />

        <link rel="manifest" href="/react-aria-widgets/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
        { /* eslint-disable react/no-danger */ }
        { /* This is how they did it in the Next.js tutorial o.O */ }
        <script dangerouslySetInnerHTML={{ __html: GOOGLE_ANALYTICS_TAG }} />
        { /* eslint-enable react/no-danger */ }
      </body>
    </Html>
  );
}
