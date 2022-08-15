import PropTypes from 'prop-types';

//Components
import Header from './Header';
import MainContainer from './MainContainer';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout(props) {
	const { children, isNavExpanded, setNavExpanded } = props;

	return (
		<>
			<Header isNavExpanded={ isNavExpanded } setNavExpanded={ setNavExpanded } />
			<MainContainer>
				<Navigation isNavExpanded={ isNavExpanded } />
				<main style={{ display: 'flex', overflow: 'auto' }}>
					{ children }
				</main>
			</MainContainer>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
