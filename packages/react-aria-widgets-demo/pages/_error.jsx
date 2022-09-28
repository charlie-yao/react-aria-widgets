import PropTypes from 'prop-types';

function Error(props) {
	const { statusCode } = props;

	return (
		<div className="container is-max-desktop content">
			<h1 style={{ marginTop: '1rem' }}>A { statusCode } Error Occurred!</h1>
			<p>(Sorry!)</p>
		</div>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

	return {
		statusCode,
	};
};

Error.propTypes = {
	statusCode: PropTypes.number.isRequired,
};

export default Error;
