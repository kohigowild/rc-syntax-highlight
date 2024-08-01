import { escapeHtml } from '../utils/escapeHtml';
var patterns = {
    key: /"(?:[^"\\]|\\.)+"(?=\s*:)/g,
    string: /"(?:\\.|[^"\\])*"/g,
    number: /\b\d+(\.\d+)?\b/g,
    boolean: /\b(true|false)\b/g,
    null: /\bnull\b/g,
    braceOpen: /{/g,
    braceClose: /}/g,
    bracketOpen: /\[/g,
    bracketClose: /\]/g,
    comma: /,/g,
    colon: /:/g,
};
export var convertJsonCode = function (json) {
    var placeholders = {};
    var index = 0;
    json = json.replace(patterns.key, function (match) {
        var placeholder = "__PLACEHOLDER_KEY_".concat(index, "__");
        placeholders[placeholder] = "<span class=\"key\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    json = json.replace(patterns.string, function (match) {
        var placeholder = "__PLACEHOLDER_STRING_".concat(index, "__");
        placeholders[placeholder] = "<span class=\"string\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    json = json.replace(patterns.number, function (match) {
        var placeholder = "__PLACEHOLDER_NUMBER_".concat(index, "__");
        placeholders[placeholder] = "<span class=\"number\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    json = json.replace(patterns.boolean, function (match) {
        var placeholder = "__PLACEHOLDER_BOOLEAN_".concat(index, "__");
        placeholders[placeholder] = "<span class=\"boolean\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    json = json.replace(patterns.null, function (match) {
        var placeholder = "__PLACEHOLDER_NULL_".concat(index, "__");
        placeholders[placeholder] = "<span class=\"null\">".concat(escapeHtml(match), "</span>");
        index++;
        return placeholder;
    });
    json = json
        .replace(patterns.braceOpen, '<span class="brace">$&</span>')
        .replace(patterns.braceClose, '<span class="brace">$&</span>')
        .replace(patterns.bracketOpen, '<span class="bracket">$&</span>')
        .replace(patterns.bracketClose, '<span class="bracket">$&</span>')
        .replace(patterns.comma, '<span class="comma">$&</span>')
        .replace(patterns.colon, '<span class="colon">$&</span>');
    Object.keys(placeholders).forEach(function (placeholder) {
        json = json.replace(placeholder, placeholders[placeholder]);
    });
    return json;
};
