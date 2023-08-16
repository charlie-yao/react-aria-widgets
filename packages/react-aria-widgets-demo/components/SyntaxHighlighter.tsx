/* eslint-disable react/jsx-props-no-spreading */

import { Prism } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

//Types
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

export default function SyntaxHighlighter(props: SyntaxHighlighterProps) {
  return (
    <Prism
      style={ a11yDark }
      customStyle={{ marginBottom: '1rem', marginTop: '1rem' }}
      { ...props }
    />
  );
}
