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
import './index.css';
var patterns = {
    comment: /(\/\/.*?$|\/\*[\s\S]*?\*\/)/g,
    string: /(?:\/\/.*$)|(?:\/\*[\s\S]*?\*\/)|(?:<!--[\s\S]*?-->)/g,
    keyword: /\b(const|let|var|function|if|else|return|for|while|do|switch|case|break|continue|default|throw|try|catch|finally|new|class|extends|super|import|from|export|as|async|await|static|get|set)\b/g,
    method: /\b\w+(?=\()/g,
    parameter: /(?<=\()\s*[\w\s,]+(?=\))/g,
};
var escapeHtml = function (text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
};
var highlight = function (code) {
    code = escapeHtml(code);
    var replacements = [
        { regex: patterns.comment, className: 'comment' },
        { regex: patterns.string, className: 'string' },
    ];
    replacements.forEach(function (_a) {
        var regex = _a.regex, className = _a.className;
        code = code.replace(regex, function (match) { return "<span class=\"".concat(className, "\">").concat(match, "</span>"); });
    });
    code = code.replace(patterns.keyword, '<span class="keyword">$&</span>');
    code = code.replace(patterns.method, '<span class="method">$&</span>');
    code = code.replace(patterns.parameter, function (match) {
        return "<span class=\"parameter\">".concat(match
            .trim()
            .replace(/(\s*,\s*)+/g, '</span>, <span class="parameter">'), "</span>");
    });
    return code;
};
var CodeBlock = function (_a) {
    var code = _a.code;
    var highlightedCode = highlight(code);
    return (_jsx("pre", __assign({ className: 'code-container' }, { children: _jsx("code", { dangerouslySetInnerHTML: { __html: highlightedCode } }) })));
};
export default CodeBlock;
