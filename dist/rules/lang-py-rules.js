import { escapeHtml } from '../utils/escapeHtml';
var patterns = {
    comment: /(#.*?$|""".*?"""|'''.*?''')/gm,
    keyword: /\b(and|as|assert|async|await|break|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|None|nonlocal|not|or|pass|raise|return|True|try|while|with|yield)\b/g,
    method: /\b\w+(?=\()/g,
    parameter: /(?<=\()\s*[\w\s,]+(?=\))/g,
};
export var convertPythonCode = function (code) {
    code = escapeHtml(code);
    var commentsAndStrings = {};
    var index = 0;
    code = code.replace(patterns.comment, function (match) {
        var placeholder = "__COMMENT_".concat(index, "__");
        commentsAndStrings[placeholder] = "<span class=\"comment\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    code = code.replace(patterns.keyword, '<span class="keyword">$&</span>');
    code = code.replace(patterns.method, '<span class="method">$&</span>');
    code = code.replace(patterns.parameter, function (match) {
        return "<span class=\"parameter\">".concat(match
            .trim()
            .replace(/(\s*,\s*)+/g, '</span>, <span class="parameter">'), "</span>");
    });
    Object.keys(commentsAndStrings).forEach(function (placeholder) {
        code = code.replace(placeholder, commentsAndStrings[placeholder]);
    });
    return code;
};
