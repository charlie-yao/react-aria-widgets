/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';
import '@charlie-yao/react-aria-widgets/styles.css';

//Components
import Layout from '../components/Layout';

//Styles
import '../styles/styles.scss';

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
