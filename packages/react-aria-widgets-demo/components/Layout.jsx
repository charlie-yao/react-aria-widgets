import PropTypes from 'prop-types';

//Components
import Header from './Header';
import MainContainer from './MainContainer';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';

function Layout(props) {
	const { children, isNavExpanded, setNavExpanded } = props;

	return (
		<>
			<Header isNavExpanded={ isNavExpanded } setNavExpanded={ setNavExpanded } />
			<MainContainer>
				<Navigation isNavExpanded={ isNavExpanded } />
				<Main>
					{ children }
				</Main>
			</MainContainer>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
