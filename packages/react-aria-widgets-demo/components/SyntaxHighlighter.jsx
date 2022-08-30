import { Prism } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function SyntaxHighlighter(props) {
	return (
		<Prism style={ a11yDark } {...props}>
		</Prism>
	);
};

export default SyntaxHighlighter;
