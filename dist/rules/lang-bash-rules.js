import { escapeHtml } from '../utils/escapeHtml';
var patterns = {
    comment: /(^#.*|<<\s*(EOF|END|END_OF_FILE).*?\s*EOF)/gm,
    string: /"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'/g,
    keyword: /\b(break|case|continue|do|done|elif|else|esac|export|fi|for|function|if|in|local|return|select|then|until|while)\b/g,
    command: /\b\w+(?=\()/g,
};
export var convertBashCode = function (code) {
    var commentsAndStrings = {};
    var index = 0;
    code = code.replace(patterns.comment, function (match) {
        var placeholder = "__PLACEHOLDER_".concat(index, "__");
        commentsAndStrings[placeholder] = "<span class=\"comment\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    code = code.replace(patterns.string, function (match) {
        var placeholder = "__PLACEHOLDER_".concat(index, "__");
        commentsAndStrings[placeholder] = "<span class=\"string\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    code = escapeHtml(code);
    code = code.replace(patterns.keyword, '<span class="keyword">$&</span>');
    code = code.replace(patterns.command, '<span class="command">$&</span>');
    Object.keys(commentsAndStrings).forEach(function (placeholder) {
        code = code.replace(placeholder, commentsAndStrings[placeholder]);
    });
    return code;
};
