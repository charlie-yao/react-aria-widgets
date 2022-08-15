/* eslint-disable react/jsx-props-no-spreading */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '@charlie-yao/react-aria-widgets/styles.css';

//Components
import Layout from '../components/Layout';

//Styles
import '../styles/styles.scss';

function App(props) {
	const { Component, pageProps } = props;
	const [ isNavExpanded, setNavExpanded ] = useState(false);
	const router = useRouter();
	const _Layout = Component.Layout ? Component.Layout : Layout;

	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			setNavExpanded(false);
		});
	}, []);

	return (
		<>
			<Head>
				<title>React ARIA Widgets</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<_Layout isNavExpanded={ isNavExpanded } setNavExpanded={ setNavExpanded }>
				<Component { ...pageProps } />
			</_Layout>
		</>
	);
}

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default App;
