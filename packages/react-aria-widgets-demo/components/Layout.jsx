import PropTypes from 'prop-types';

function Layout(props) {
	const { children } = props;

	return (
		<>
			{ children }
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
