import { Html, Head, Main, NextScript } from 'next/document';

const description = 'A collection of React components designed to help implement the ARIA Authoring Practices Guide (APG).';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content={ description } />
				<meta property="og:title" content="React ARIA Widgets" />
				<meta property="og:type" content="website" />
				<meta property="og:description" content={ description } />
				{ /*
				<meta property="og:url" content="https://charlieyao.com/reactariawidgets" />
				<meta property="og:image" content="" />
				*/ }
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
