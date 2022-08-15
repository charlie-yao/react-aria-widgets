import PropTypes from 'prop-types';

//Components
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout(props) {
	const { children, isNavExpanded, setNavExpanded } = props;

	return (
		<>
			<Header isNavExpanded={ isNavExpanded } setNavExpanded={ setNavExpanded } />
			<div style={{ display: 'flex' }}>
				<Navigation isNavExpanded={ isNavExpanded } />
				<main style={{ display: 'flex', overflow: 'auto' }}>
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
