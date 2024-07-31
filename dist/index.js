var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { convertJSCode } from './rules/lang-js-rules';
import { convertPythonCode } from './rules/lang-py-rules';
import './index.css';
var CodeBlock = function (_a) {
    var lang = _a.lang, code = _a.code;
    var _b = useState(''), highlightedCode = _b[0], setHighlightedCode = _b[1];
    useEffect(function () {
        if (lang.toLowerCase() === 'javascript') {
            setHighlightedCode(convertJSCode(code));
        }
        else if (lang.toLowerCase() === 'python') {
            setHighlightedCode(convertPythonCode(code));
        }
    }, []);
    return (_jsx("pre", __assign({ className: 'code-container' }, { children: _jsx("code", { dangerouslySetInnerHTML: { __html: highlightedCode } }) })));
};
export default CodeBlock;
