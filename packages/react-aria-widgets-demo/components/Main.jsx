//Components and Styles
import styles from './Main.module.scss';

export default function Main(props) {
	const { children } = props;

	return (
		<main className={ styles.Main }>
			{ children }
		</main>
	);
}
