import React from 'react';
import './index.css';
interface SyntaxHighlighterProps {
    lang: string;
    code: string;
}
declare const CodeBlock: React.FC<SyntaxHighlighterProps>;
export default CodeBlock;
