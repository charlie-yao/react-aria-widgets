import { Html, Head, Main, NextScript } from 'next/document';

const description = 'A collection of React components designed to help implement the ARIA Authoring Practices Guide (APG).';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{ /*
					Allows control over where resources are loaded from. Place first as it
					only affects resources declared after it.
				*/ }
				{ /* <meta http-equiv="Content-Security-Policy" content="default-src 'self'" /> */ }

				<meta name="description" content={ description } />

				{ /* Control the behavior of search engine crawling and indexing */ }
				{ /* <meta name="robots" content="index,follow" /> */ }
				{ /* <meta name="googlebot" content="index,follow"> */ }

				{ /* Tells Google not to show the sitelinks search box */ }
				{ /* <meta name="google" content="nositelinksearchbox" /> */ }

				{ /* FB Open Graph */ }
				<meta property="og:title" content="React ARIA Widgets" />
				<meta property="og:type" content="website" />
				<meta property="og:description" content={ description } />
				{ /* <meta property="og:url" content="https://charlieyao.com/react-aria-widgets" /> */ }
				{ /* <meta property="og:image" content="" /> */ }

				{ /* Set the base URL for all relative URLs within the document */ }
				{ /* <base href="https://charlieyao.com/react-aria-widgets" /> */ }

				{ /* Links to information about the author(s) of the document */ }
				{ /* <link rel="author" href="humans.txt" /> */ }

				{ /* Refers to a copyright statement that applies to the link's context */ }
				{ /* <link rel="license" href="copyright.html" /> */ }
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
