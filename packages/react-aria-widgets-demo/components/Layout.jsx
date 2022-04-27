import PropTypes from 'prop-types';

//Components
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout(props) {
	const { children } = props;

	return (
		<>
			<Header />
			<Navigation />
			<main>
				{ children }
			</main>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
