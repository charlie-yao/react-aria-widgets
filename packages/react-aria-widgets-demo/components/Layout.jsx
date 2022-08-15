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
