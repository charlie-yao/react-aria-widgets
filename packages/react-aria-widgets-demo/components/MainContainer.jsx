import PropTypes from 'prop-types';

//Components and Styles
import styles from './MainContainer.module.scss';

function MainContainer(props) {
	const { children } = props;

	return (
		<div className={ styles.MainContainer }>
			{ children }
		</div>
	);
}

MainContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default MainContainer;
