import { useState } from 'react';
import PropTypes from 'prop-types';

//Components
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout(props) {
	const { children } = props;
	const [ isNavExpanded, toggleNavExpanded ] = useState(false);

	return (
		<>
			<Header isNavExpanded={ isNavExpanded } toggleNavExpanded={ toggleNavExpanded } />
			<Navigation isNavExpanded={ isNavExpanded } />
			<main className="container">
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
