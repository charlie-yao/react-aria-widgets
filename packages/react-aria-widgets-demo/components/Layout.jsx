import PropTypes from 'prop-types';

//Components
import Header from './Header';
import MainContainer from './MainContainer';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';

function Layout(props) {
  const { children, SubNav } = props;

  return (
    <>
      <Header />
      <MainContainer>
        <Navigation />
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
  SubNav: PropTypes.elementType,
};

Layout.defaultProps = {
  SubNav: undefined,
};

export default Layout;
