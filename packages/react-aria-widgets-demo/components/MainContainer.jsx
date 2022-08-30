//Components and Styles
import styles from './MainContainer.module.scss';

export default function MainContainer(props) {
	const { children } = props;

	return (
		<div className={ styles.MainContainer }>
			{ children }
		</div>
	);
}
