//Components
import Header from './Header';
import MainContainer from './MainContainer';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';

//Types
import type { ReactNode, ComponentType } from 'react';

interface LayoutProps {
  children?: ReactNode;
  SubNav?: ComponentType | null;
}

export default function Layout({
  children = null,
  SubNav = null
}: LayoutProps) {
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
