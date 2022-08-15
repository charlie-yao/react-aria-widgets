/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '@charlie-yao/react-aria-widgets/styles.css';

//Components
import Layout from '../components/Layout';

//Styles
import '../styles/styles.scss';

function App(props) {
	const { Component, pageProps } = props;
	const [ isNavExpanded, setNavExpanded ] = useState(false);

	return (
		<>
			<Head>
				<title>React ARIA Widgets</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Layout isNavExpanded={ isNavExpanded } setNavExpanded={ setNavExpanded }>
				<Component { ...pageProps } />
			</Layout>
		</>
	);
}

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default App;
