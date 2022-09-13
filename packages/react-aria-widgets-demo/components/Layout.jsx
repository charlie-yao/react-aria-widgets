import PropTypes from 'prop-types';

//Components
import Header from './Header';
import MainContainer from './MainContainer';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';

function Layout(props) {
	const { children, isNavExpanded, setNavExpanded, SubNav } = props;

	return (
		<>
			<Header isNavExpanded={ isNavExpanded } setNavExpanded={ setNavExpanded } />
			<MainContainer>
				<Navigation isNavExpanded={ isNavExpanded } />
				<Main>
					{ children }
				</Main>
				{
					SubNav &&
					<aside>
						<SubNav />
					</aside>
				}
			</MainContainer>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	isNavExpanded: PropTypes.bool.isRequired,
	setNavExpanded: PropTypes.func.isRequired,
	SubNav: PropTypes.node,
};

Layout.defaultProps = {
	SubNav: undefined,
};

export default Layout;
