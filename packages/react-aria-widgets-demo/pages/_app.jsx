/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';

//Components
import Layout from '../components/Layout';

function App(props) {
	const { Component, pageProps } = props;

	return (
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	);
}

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default App;
