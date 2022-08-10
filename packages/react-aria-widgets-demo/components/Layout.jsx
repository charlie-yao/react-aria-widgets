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
			<div className="columns is-desktop">
				<Navigation />
				<main>
					{ children }
				</main>
			</div>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
