import PropTypes from 'prop-types';

//Components and Styles
import styles from './Main.module.scss';

function Main(props) {
  const { children } = props;

  return (
    <main className={ styles.Main }>
      { children }
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
