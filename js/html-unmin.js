"use strict";
var _0xdcc3 = ["test"],
    _0xa8a9 = [_0xdcc3[0]];

function isJs(c) {
    if ((/function\s*?\w+\s*?\(.*?\)\s*?\{[\s\S]+?\}/ [_0xa8a9[0]](c) || /var\s*?\w+\s*?=/ [_0xa8a9[0]](c)) && !/<(script).*?>[\s\S]+?<\/\1>/ [_0xa8a9[0]](c)) return !0
}
var _0x56af = [_0xdcc3[0]];

function isHtml(c) {
    if (/<(\w+).*?>[\s\S]+?<\/\1>/ [_0x56af[0]](c)) return !0
}
var _0xfac4 = ["value", "textarea", "getElementById", "Css", "log", "Js", "Html"];

function unminify() {
    var c = document[_0xfac4[2]](_0xfac4[1])[_0xfac4[0]];
    isJs(c) ? (console[_0xfac4[4]](_0xfac4[5]), c = js_beautify(c)) : isHtml(c) ? (console[_0xfac4[4]](_0xfac4[6]), c = html_beautify(c)) : c = html_beautify(c), document[_0xfac4[2]](_0xfac4[1])[_0xfac4[0]] = c
}
var _0x8c0d = ["#copybtn", "querySelector", "click", "#textarea", "select", "copy", "execCommand", "Success", "Unsuccess", "! Copied successfully. Please paste anywhere.", "Oops, unable to copy !", "addEventListener"],
    copyTextareaBtn = document[_0x8c0d[1]](_0x8c0d[0]);
copyTextareaBtn[_0x8c0d[11]](_0x8c0d[2], function (c) {
    document[_0x8c0d[1]](_0x8c0d[3])[_0x8c0d[4]]();
    try {
        var e = document[_0x8c0d[6]](_0x8c0d[5]) ? _0x8c0d[7] : _0x8c0d[8];
        alert(e + _0x8c0d[9])
    } catch (c) {
        alert(_0x8c0d[10])
    }
});
var _0x8d69 = ["value", "textarea", "getElementById", ""];

function eraseText() {
    document[_0x8d69[2]](_0x8d69[1])[_0x8d69[0]] = _0x8d69[3]
}
var _0xf8ed = ["", "replace", "wrap_line_length", "max_char", "indent_inner_html", "indent_body_inner_html", "indent_head_inner_html", "indent_size", "indent_char", " ", "brace_style", "collapse", "unformatted", "preserve_newlines", "max_preserve_newlines", "indent_handlebars", "wrap_attributes", "auto", "wrap_attributes_indent_size", "length", "force", "substr", "end_with_newline", "extra_liners", "object", "concat", "string", ",", "split", "head,body,/html", "eol", "\n", "indent_with_tabs", "\t", "\r", "pos", "token", "current_mode", "CONTENT", "tags", "parent1", "tag_type", "token_text", "last_token", "last_text", "token_type", "newlines", "indent_content", "Utils", "\n\r\t ", "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr", "!doctype", "?xml", "?php", "basefont", "isindex", "is_whitespace", "charAt", "whitespace", "in_array", "traverse_whitespace", "space_or_wrap", "line_char_count", "print_newline", "print_indentation", "push", "get_content", "join", "TK_EOF", "{{#", "{{/", "{{!", "get_tag", "TK_TAG_HANDLEBARS_COMMENT", "{{", "{{else}}", "<", "get_contents_to", "</", "\\s*>", "igm", "lastIndex", "exec", "index", "substring", "record_tag", "count", "indent_level", "parent", "retrieve_tag", "indent_to_tag", "'", '"', "get_unformatted", "=", ">", "/", "force-aligned", "indexOf", "}}", "{", "#", "!", "?", "%", "get_comment", "}", "toLowerCase", "single_token", "SINGLE", "else", "if", "HANDLEBARS_ELSE", "is_unformatted", "script", "type", "search", "SCRIPT", "style", "text/css", "STYLE", "END", "html", "START", "output", "<![if", "<![endif]>", "<![cdata[", "]]>", "<![", "]>", "\x3c!--", "--\x3e", "{{!--", "--}}", "<?", "?>", "<%", "%>", "add", "doesNotMatch", "get_token", "TK_TAG_SCRIPT", "TK_TAG_STYLE", "TK_", "TK_CONTENT", "TAG", "TK_TAG_", "get_full_indent", "indent_string", "a", "match", "printer", "indent_character", "print_token", "print_token_raw", "slice", "indent", "unindent", "TK_TAG_START", "TK_TAG_END", "TK_TAG_SINGLE", "TK_TAG_HANDLEBARS_ELSE", "TK_STYLE", "TK_SCRIPT", "function", "indent_scripts", "keep", "separate", "prototype", "amd", "require", "./beautify", "./beautify-css", "js_beautify", "css_beautify", "undefined", "./beautify.js", "./beautify-css.js", "html_beautify"];
! function () {
    function e(e) {
        return e[_0xf8ed[1]](/\s+$/g, _0xf8ed[0])
    }

    function f(f, _, d, x) {
        var t, i, s, h, n, r, a, o, u, c, p, l, v, b, T, g, w, y;
        for (void 0 !== (_ = _ || {})[_0xf8ed[2]] && 0 !== parseInt(_[_0xf8ed[2]], 10) || void 0 === _[_0xf8ed[3]] || 0 === parseInt(_[_0xf8ed[3]], 10) || (_[_0xf8ed[2]] = _[_0xf8ed[3]]), i = void 0 !== _[_0xf8ed[4]] && _[_0xf8ed[4]], s = void 0 === _[_0xf8ed[5]] || _[_0xf8ed[5]], h = void 0 === _[_0xf8ed[6]] || _[_0xf8ed[6]], n = void 0 === _[_0xf8ed[7]] ? 4 : parseInt(_[_0xf8ed[7]], 10), r = void 0 === _[_0xf8ed[8]] ? _0xf8ed[9] : _[_0xf8ed[8]], o = void 0 === _[_0xf8ed[10]] ? _0xf8ed[11] : _[_0xf8ed[10]], a = 0 === parseInt(_[_0xf8ed[2]], 10) ? 32786 : parseInt(_[_0xf8ed[2]] || 250, 10), u = _[_0xf8ed[12]] || [], c = void 0 === _[_0xf8ed[13]] || _[_0xf8ed[13]], p = c ? isNaN(parseInt(_[_0xf8ed[14]], 10)) ? 32786 : parseInt(_[_0xf8ed[14]], 10) : 0, l = void 0 !== _[_0xf8ed[15]] && _[_0xf8ed[15]], v = void 0 === _[_0xf8ed[16]] ? _0xf8ed[17] : _[_0xf8ed[16]], b = isNaN(parseInt(_[_0xf8ed[18]], 10)) ? n : parseInt(_[_0xf8ed[18]], 10), T = v[_0xf8ed[21]](0, _0xf8ed[20][_0xf8ed[19]]) === _0xf8ed[20], g = void 0 !== _[_0xf8ed[22]] && _[_0xf8ed[22]], w = typeof _[_0xf8ed[23]] === _0xf8ed[24] && _[_0xf8ed[23]] ? _[_0xf8ed[23]][_0xf8ed[25]]() : typeof _[_0xf8ed[23]] === _0xf8ed[26] ? _[_0xf8ed[23]][_0xf8ed[28]](_0xf8ed[27]) : _0xf8ed[29][_0xf8ed[28]](_0xf8ed[27]), y = _[_0xf8ed[30]] ? _[_0xf8ed[30]] : _0xf8ed[31], _[_0xf8ed[32]] && (r = _0xf8ed[33], n = 1), y = y[_0xf8ed[1]](/\\r/, _0xf8ed[34])[_0xf8ed[1]](/\\n/, _0xf8ed[31]), (t = new function () {
                return this[_0xf8ed[35]] = 0, this[_0xf8ed[36]] = _0xf8ed[0], this[_0xf8ed[37]] = _0xf8ed[38], this[_0xf8ed[39]] = {
                    parent: _0xf8ed[40],
                    parentcount: 1,
                    parent1: _0xf8ed[0]
                }, this[_0xf8ed[41]] = _0xf8ed[0], this[_0xf8ed[42]] = this[_0xf8ed[43]] = this[_0xf8ed[44]] = this[_0xf8ed[45]] = _0xf8ed[0], this[_0xf8ed[46]] = 0, this[_0xf8ed[47]] = i, this[_0xf8ed[5]] = s, this[_0xf8ed[6]] = h, this[_0xf8ed[48]] = {
                    whitespace: _0xf8ed[49][_0xf8ed[28]](_0xf8ed[0]),
                    single_token: [_0xf8ed[50], _0xf8ed[51], _0xf8ed[52], _0xf8ed[53], _0xf8ed[54], _0xf8ed[55], _0xf8ed[56], _0xf8ed[57], _0xf8ed[58], _0xf8ed[59], _0xf8ed[60], _0xf8ed[61], _0xf8ed[62], _0xf8ed[63], _0xf8ed[64], _0xf8ed[65], _0xf8ed[66], _0xf8ed[67], _0xf8ed[68], _0xf8ed[69], _0xf8ed[70]],
                    extra_liners: w,
                    in_array: function (e, f) {
                        for (var _ = 0; _ < f[_0xf8ed[19]]; _++)
                            if (e === f[_]) return !0;
                        return !1
                    }
                }, this[_0xf8ed[71]] = function (e) {
                    for (var f = 0; f < e[_0xf8ed[19]]; f++)
                        if (!this[_0xf8ed[48]][_0xf8ed[74]](e[_0xf8ed[72]](f), this[_0xf8ed[48]][_0xf8ed[73]])) return !1;
                    return !0
                }, this[_0xf8ed[75]] = function () {
                    var e = _0xf8ed[0];
                    if (e = this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]), this[_0xf8ed[48]][_0xf8ed[74]](e, this[_0xf8ed[48]][_0xf8ed[73]])) {
                        for (this[_0xf8ed[46]] = 0; this[_0xf8ed[48]][_0xf8ed[74]](e, this[_0xf8ed[48]][_0xf8ed[73]]);) c && e === _0xf8ed[31] && this[_0xf8ed[46]] <= p && (this[_0xf8ed[46]] += 1), this[_0xf8ed[35]]++, e = this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]);
                        return !0
                    }
                    return !1
                }, this[_0xf8ed[76]] = function (e) {
                    return this[_0xf8ed[77]] >= this[_0xf8ed[2]] ? (this[_0xf8ed[78]](!1, e), this[_0xf8ed[79]](e), !0) : (this[_0xf8ed[77]]++, e[_0xf8ed[80]](_0xf8ed[9]), !1)
                }, this[_0xf8ed[81]] = function () {
                    for (var e = _0xf8ed[0], f = []; this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]) !== _0xf8ed[91];) {
                        if (this[_0xf8ed[35]] >= this[_0xf8ed[57]][_0xf8ed[19]]) return f[_0xf8ed[19]] ? f[_0xf8ed[82]](_0xf8ed[0]) : [_0xf8ed[0], _0xf8ed[83]];
                        if (this[_0xf8ed[75]]()) this[_0xf8ed[76]](f);
                        else {
                            if (l) {
                                var _ = this[_0xf8ed[57]][_0xf8ed[21]](this[_0xf8ed[35]], 3);
                                if (_ === _0xf8ed[84] || _ === _0xf8ed[85]) break;
                                if (_ === _0xf8ed[86]) return [this[_0xf8ed[87]](), _0xf8ed[88]];
                                if (this[_0xf8ed[57]][_0xf8ed[21]](this[_0xf8ed[35]], 2) === _0xf8ed[89] && this[_0xf8ed[87]](!0) === _0xf8ed[90]) break
                            }
                            e = this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]), this[_0xf8ed[35]]++, this[_0xf8ed[77]]++, f[_0xf8ed[80]](e)
                        }
                    }
                    return f[_0xf8ed[19]] ? f[_0xf8ed[82]](_0xf8ed[0]) : _0xf8ed[0]
                }, this[_0xf8ed[92]] = function (e) {
                    if (this[_0xf8ed[35]] === this[_0xf8ed[57]][_0xf8ed[19]]) return [_0xf8ed[0], _0xf8ed[83]];
                    var f = _0xf8ed[0],
                        _ = new RegExp(_0xf8ed[93] + e + _0xf8ed[94], _0xf8ed[95]);
                    _[_0xf8ed[96]] = this[_0xf8ed[35]];
                    var d = _[_0xf8ed[97]](this[_0xf8ed[57]]),
                        x = d ? d[_0xf8ed[98]] : this[_0xf8ed[57]][_0xf8ed[19]];
                    return this[_0xf8ed[35]] < x && (f = this[_0xf8ed[57]][_0xf8ed[99]](this[_0xf8ed[35]], x), this[_0xf8ed[35]] = x), f
                }, this[_0xf8ed[100]] = function (e) {
                    this[_0xf8ed[39]][e + _0xf8ed[101]] ? (this[_0xf8ed[39]][e + _0xf8ed[101]]++, this[_0xf8ed[39]][e + this[_0xf8ed[39]][e + _0xf8ed[101]]] = this[_0xf8ed[102]]) : (this[_0xf8ed[39]][e + _0xf8ed[101]] = 1, this[_0xf8ed[39]][e + this[_0xf8ed[39]][e + _0xf8ed[101]]] = this[_0xf8ed[102]]), this[_0xf8ed[39]][e + this[_0xf8ed[39]][e + _0xf8ed[101]] + _0xf8ed[103]] = this[_0xf8ed[39]][_0xf8ed[103]], this[_0xf8ed[39]][_0xf8ed[103]] = e + this[_0xf8ed[39]][e + _0xf8ed[101]]
                }, this[_0xf8ed[104]] = function (e) {
                    if (this[_0xf8ed[39]][e + _0xf8ed[101]]) {
                        for (var f = this[_0xf8ed[39]][_0xf8ed[103]]; f && e + this[_0xf8ed[39]][e + _0xf8ed[101]] !== f;) f = this[_0xf8ed[39]][f + _0xf8ed[103]];
                        f && (this[_0xf8ed[102]] = this[_0xf8ed[39]][e + this[_0xf8ed[39]][e + _0xf8ed[101]]], this[_0xf8ed[39]][_0xf8ed[103]] = this[_0xf8ed[39]][f + _0xf8ed[103]]), delete this[_0xf8ed[39]][e + this[_0xf8ed[39]][e + _0xf8ed[101]] + _0xf8ed[103]], delete this[_0xf8ed[39]][e + this[_0xf8ed[39]][e + _0xf8ed[101]]], 1 === this[_0xf8ed[39]][e + _0xf8ed[101]] ? delete this[_0xf8ed[39]][e + _0xf8ed[101]] : this[_0xf8ed[39]][e + _0xf8ed[101]]--
                    }
                }, this[_0xf8ed[105]] = function (e) {
                    if (this[_0xf8ed[39]][e + _0xf8ed[101]]) {
                        for (var f = this[_0xf8ed[39]][_0xf8ed[103]]; f && e + this[_0xf8ed[39]][e + _0xf8ed[101]] !== f;) f = this[_0xf8ed[39]][f + _0xf8ed[103]];
                        f && (this[_0xf8ed[102]] = this[_0xf8ed[39]][e + this[_0xf8ed[39]][e + _0xf8ed[101]]])
                    }
                }, this[_0xf8ed[87]] = function (e) {
                    var f, _, d = _0xf8ed[0],
                        x = [],
                        t = _0xf8ed[0],
                        i = !1,
                        s = !0,
                        h = this[_0xf8ed[35]],
                        n = this[_0xf8ed[77]];
                    e = void 0 !== e && e;
                    do {
                        if (this[_0xf8ed[35]] >= this[_0xf8ed[57]][_0xf8ed[19]]) return e && (this[_0xf8ed[35]] = h, this[_0xf8ed[77]] = n), x[_0xf8ed[19]] ? x[_0xf8ed[82]](_0xf8ed[0]) : [_0xf8ed[0], _0xf8ed[83]];
                        if (d = this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]), this[_0xf8ed[35]]++, this[_0xf8ed[48]][_0xf8ed[74]](d, this[_0xf8ed[48]][_0xf8ed[73]])) i = !0;
                        else {
                            if (d !== _0xf8ed[106] && d !== _0xf8ed[107] || (d += this[_0xf8ed[108]](d), i = !0), d === _0xf8ed[109] && (i = !1), x[_0xf8ed[19]] && x[x[_0xf8ed[19]] - 1] !== _0xf8ed[109] && d !== _0xf8ed[110] && i) {
                                var a = this[_0xf8ed[76]](x) && d !== _0xf8ed[111] && !T;
                                if (i = !1, !s && T && d !== _0xf8ed[111] && (this[_0xf8ed[78]](!1, x), this[_0xf8ed[79]](x), a = !0), a) {
                                    var o = b;
                                    v === _0xf8ed[112] && (o = x[_0xf8ed[113]](_0xf8ed[9]) + 1);
                                    for (var c = 0; c < o; c++) x[_0xf8ed[80]](r)
                                }
                                for (var p = 0; p < x[_0xf8ed[19]]; p++)
                                    if (x[p] === _0xf8ed[9]) {
                                        s = !1;
                                        break
                                    }
                            }
                            if (l && _ === _0xf8ed[91] && d + this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]) === _0xf8ed[89] && (d += this[_0xf8ed[108]](_0xf8ed[114]), x[_0xf8ed[19]] && x[x[_0xf8ed[19]] - 1] !== _0xf8ed[9] && x[x[_0xf8ed[19]] - 1] !== _0xf8ed[91] && (d = _0xf8ed[9] + d), i = !0), d !== _0xf8ed[91] || _ || (f = this[_0xf8ed[35]] - 1, _ = _0xf8ed[91]), l && !_ && x[_0xf8ed[19]] >= 2 && x[x[_0xf8ed[19]] - 1] === _0xf8ed[115] && x[x[_0xf8ed[19]] - 2] === _0xf8ed[115] && (f = d === _0xf8ed[116] || d === _0xf8ed[111] || d === _0xf8ed[117] ? this[_0xf8ed[35]] - 3 : this[_0xf8ed[35]] - 2, _ = _0xf8ed[115]), this[_0xf8ed[77]]++, x[_0xf8ed[80]](d), x[1] && (x[1] === _0xf8ed[117] || x[1] === _0xf8ed[118] || x[1] === _0xf8ed[119])) {
                                x = [this[_0xf8ed[120]](f)];
                                break
                            }
                            if (l && x[1] && x[1] === _0xf8ed[115] && x[2] && x[2] === _0xf8ed[117]) {
                                x = [this[_0xf8ed[120]](f)];
                                break
                            }
                            if (l && _ === _0xf8ed[115] && x[_0xf8ed[19]] > 2 && x[x[_0xf8ed[19]] - 2] === _0xf8ed[121] && x[x[_0xf8ed[19]] - 1] === _0xf8ed[121]) break
                        }
                    } while (d !== _0xf8ed[110]);
                    var g, w, y = x[_0xf8ed[82]](_0xf8ed[0]);
                    g = -1 !== y[_0xf8ed[113]](_0xf8ed[9]) ? y[_0xf8ed[113]](_0xf8ed[9]) : y[_0xf8ed[72]](0) === _0xf8ed[115] ? y[_0xf8ed[113]](_0xf8ed[121]) : y[_0xf8ed[113]](_0xf8ed[110]), w = y[_0xf8ed[72]](0) !== _0xf8ed[91] && l ? y[_0xf8ed[72]](2) === _0xf8ed[116] ? 3 : 2 : 1;
                    var k = y[_0xf8ed[99]](w, g)[_0xf8ed[122]]();
                    return y[_0xf8ed[72]](y[_0xf8ed[19]] - 2) === _0xf8ed[111] || this[_0xf8ed[48]][_0xf8ed[74]](k, this[_0xf8ed[48]][_0xf8ed[123]]) ? e || (this[_0xf8ed[41]] = _0xf8ed[124]) : l && y[_0xf8ed[72]](0) === _0xf8ed[115] && k === _0xf8ed[125] ? e || (this[_0xf8ed[105]](_0xf8ed[126]), this[_0xf8ed[41]] = _0xf8ed[127], this[_0xf8ed[47]] = !0, this[_0xf8ed[75]]()) : this[_0xf8ed[128]](k, u) ? (t = this[_0xf8ed[108]](_0xf8ed[93] + k + _0xf8ed[110], y), x[_0xf8ed[80]](t), this[_0xf8ed[35]], this[_0xf8ed[41]] = _0xf8ed[124]) : k === _0xf8ed[129] && (-1 === y[_0xf8ed[131]](_0xf8ed[130]) || y[_0xf8ed[131]](_0xf8ed[130]) > -1 && y[_0xf8ed[131]](/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1) ? e || (this[_0xf8ed[100]](k), this[_0xf8ed[41]] = _0xf8ed[132]) : k === _0xf8ed[133] && (-1 === y[_0xf8ed[131]](_0xf8ed[130]) || y[_0xf8ed[131]](_0xf8ed[130]) > -1 && y[_0xf8ed[131]](_0xf8ed[134]) > -1) ? e || (this[_0xf8ed[100]](k), this[_0xf8ed[41]] = _0xf8ed[135]) : k[_0xf8ed[72]](0) === _0xf8ed[117] ? e || (this[_0xf8ed[41]] = _0xf8ed[124], this[_0xf8ed[75]]()) : e || (k[_0xf8ed[72]](0) === _0xf8ed[111] ? (this[_0xf8ed[104]](k[_0xf8ed[99]](1)), this[_0xf8ed[41]] = _0xf8ed[136]) : (this[_0xf8ed[100]](k), k[_0xf8ed[122]]() !== _0xf8ed[137] && (this[_0xf8ed[47]] = !0), this[_0xf8ed[41]] = _0xf8ed[138]), this[_0xf8ed[75]]() && this[_0xf8ed[76]](x), this[_0xf8ed[48]][_0xf8ed[74]](k, this[_0xf8ed[48]][_0xf8ed[23]]) && (this[_0xf8ed[78]](!1, this[_0xf8ed[139]]), this[_0xf8ed[139]][_0xf8ed[19]] && this[_0xf8ed[139]][this[_0xf8ed[139]][_0xf8ed[19]] - 2] !== _0xf8ed[31] && this[_0xf8ed[78]](!0, this[_0xf8ed[139]]))), e && (this[_0xf8ed[35]] = h, this[_0xf8ed[77]] = n), x[_0xf8ed[82]](_0xf8ed[0])
                }, this[_0xf8ed[120]] = function (e) {
                    var f = _0xf8ed[0],
                        _ = _0xf8ed[110],
                        d = !1;
                    this[_0xf8ed[35]] = e;
                    var x = this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]);
                    for (this[_0xf8ed[35]]++; this[_0xf8ed[35]] <= this[_0xf8ed[57]][_0xf8ed[19]] && ((f += x)[_0xf8ed[72]](f[_0xf8ed[19]] - 1) !== _[_0xf8ed[72]](_[_0xf8ed[19]] - 1) || -1 === f[_0xf8ed[113]](_));) !d && f[_0xf8ed[19]] < 10 && (0 === f[_0xf8ed[113]](_0xf8ed[140]) ? (_ = _0xf8ed[141], d = !0) : 0 === f[_0xf8ed[113]](_0xf8ed[142]) ? (_ = _0xf8ed[143], d = !0) : 0 === f[_0xf8ed[113]](_0xf8ed[144]) ? (_ = _0xf8ed[145], d = !0) : 0 === f[_0xf8ed[113]](_0xf8ed[146]) ? (_ = _0xf8ed[147], d = !0) : 0 === f[_0xf8ed[113]](_0xf8ed[148]) ? (_ = _0xf8ed[149], d = !0) : 0 === f[_0xf8ed[113]](_0xf8ed[86]) ? 5 === f[_0xf8ed[19]] && -1 === f[_0xf8ed[113]](_0xf8ed[148]) && (_ = _0xf8ed[114], d = !0) : 0 === f[_0xf8ed[113]](_0xf8ed[150]) ? (_ = _0xf8ed[151], d = !0) : 0 === f[_0xf8ed[113]](_0xf8ed[152]) && (_ = _0xf8ed[153], d = !0)), x = this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]), this[_0xf8ed[35]]++;
                    return f
                }, this[_0xf8ed[108]] = function (e, f) {
                    if (f && -1 !== f[_0xf8ed[122]]()[_0xf8ed[113]](e)) return _0xf8ed[0];
                    var _, d, x = _0xf8ed[0],
                        t = _0xf8ed[0],
                        i = !0,
                        s = (_ = e, d = _0xf8ed[0], {
                            add: function (e) {
                                var f = d + e[_0xf8ed[122]]();
                                d = f[_0xf8ed[19]] <= _[_0xf8ed[19]] ? f : f[_0xf8ed[21]](f[_0xf8ed[19]] - _[_0xf8ed[19]], _[_0xf8ed[19]])
                            },
                            doesNotMatch: function () {
                                return -1 === d[_0xf8ed[113]](_)
                            }
                        });
                    do {
                        if (this[_0xf8ed[35]] >= this[_0xf8ed[57]][_0xf8ed[19]]) return t;
                        if (x = this[_0xf8ed[57]][_0xf8ed[72]](this[_0xf8ed[35]]), this[_0xf8ed[35]]++, this[_0xf8ed[48]][_0xf8ed[74]](x, this[_0xf8ed[48]][_0xf8ed[73]])) {
                            if (!i) {
                                this[_0xf8ed[77]]--;
                                continue
                            }
                            if (x === _0xf8ed[31] || x === _0xf8ed[34]) {
                                t += _0xf8ed[31], this[_0xf8ed[77]] = 0;
                                continue
                            }
                        }
                        t += x, s[_0xf8ed[154]](x), this[_0xf8ed[77]]++, i = !0, l && x === _0xf8ed[115] && t[_0xf8ed[19]] && t[_0xf8ed[72]](t[_0xf8ed[19]] - 2) === _0xf8ed[115] && (t += this[_0xf8ed[108]](_0xf8ed[114]))
                    } while (s[_0xf8ed[155]]());
                    return t
                }, this[_0xf8ed[156]] = function () {
                    var e;
                    if (this[_0xf8ed[43]] === _0xf8ed[157] || this[_0xf8ed[43]] === _0xf8ed[158]) {
                        var f = this[_0xf8ed[43]][_0xf8ed[21]](7);
                        return typeof (e = this[_0xf8ed[92]](f)) !== _0xf8ed[26] ? e : [e, _0xf8ed[159] + f]
                    }
                    return this[_0xf8ed[37]] === _0xf8ed[38] ? typeof (e = this[_0xf8ed[81]]()) !== _0xf8ed[26] ? e : [e, _0xf8ed[160]] : this[_0xf8ed[37]] === _0xf8ed[161] ? typeof (e = this[_0xf8ed[87]]()) !== _0xf8ed[26] ? e : [e, _0xf8ed[162] + this[_0xf8ed[41]]] : void 0
                }, this[_0xf8ed[163]] = function (e) {
                    return (e = this[_0xf8ed[102]] + e || 0) < 1 ? _0xf8ed[0] : Array(e + 1)[_0xf8ed[82]](this[_0xf8ed[164]])
                }, this[_0xf8ed[128]] = function (e, f) {
                    if (!this[_0xf8ed[48]][_0xf8ed[74]](e, f)) return !1;
                    if (e[_0xf8ed[122]]() !== _0xf8ed[165] || !this[_0xf8ed[48]][_0xf8ed[74]](_0xf8ed[165], f)) return !0;
                    var _ = (this[_0xf8ed[87]](!0) || _0xf8ed[0])[_0xf8ed[166]](/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                    return !(_ && !this[_0xf8ed[48]][_0xf8ed[74]](_, f))
                }, this[_0xf8ed[167]] = function (f, _, d, x, t) {
                    this[_0xf8ed[57]] = f || _0xf8ed[0], this[_0xf8ed[57]] = this[_0xf8ed[57]][_0xf8ed[1]](/\r\n|[\r\u2028\u2029]/g, _0xf8ed[31]), this[_0xf8ed[139]] = [], this[_0xf8ed[168]] = _, this[_0xf8ed[164]] = _0xf8ed[0], this[_0xf8ed[7]] = d, this[_0xf8ed[10]] = t, this[_0xf8ed[102]] = 0, this[_0xf8ed[2]] = x, this[_0xf8ed[77]] = 0;
                    for (var i = 0; i < this[_0xf8ed[7]]; i++) this[_0xf8ed[164]] += this[_0xf8ed[168]];
                    this[_0xf8ed[78]] = function (f, _) {
                        this[_0xf8ed[77]] = 0, _ && _[_0xf8ed[19]] && (f || _[_[_0xf8ed[19]] - 1] !== _0xf8ed[31]) && (_[_[_0xf8ed[19]] - 1] !== _0xf8ed[31] && (_[_[_0xf8ed[19]] - 1] = e(_[_[_0xf8ed[19]] - 1])), _[_0xf8ed[80]](_0xf8ed[31]))
                    }, this[_0xf8ed[79]] = function (e) {
                        for (var f = 0; f < this[_0xf8ed[102]]; f++) e[_0xf8ed[80]](this[_0xf8ed[164]]), this[_0xf8ed[77]] += this[_0xf8ed[164]][_0xf8ed[19]]
                    }, this[_0xf8ed[169]] = function (e) {
                        this[_0xf8ed[71]](e) && !this[_0xf8ed[139]][_0xf8ed[19]] || ((e || e !== _0xf8ed[0]) && this[_0xf8ed[139]][_0xf8ed[19]] && this[_0xf8ed[139]][this[_0xf8ed[139]][_0xf8ed[19]] - 1] === _0xf8ed[31] && (this[_0xf8ed[79]](this[_0xf8ed[139]]), e = e[_0xf8ed[1]](/^\s+/g, _0xf8ed[0])), this[_0xf8ed[170]](e))
                    }, this[_0xf8ed[170]] = function (f) {
                        this[_0xf8ed[46]] > 0 && (f = e(f)), f && f !== _0xf8ed[0] && (f[_0xf8ed[19]] > 1 && f[_0xf8ed[72]](f[_0xf8ed[19]] - 1) === _0xf8ed[31] ? (this[_0xf8ed[139]][_0xf8ed[80]](f[_0xf8ed[171]](0, -1)), this[_0xf8ed[78]](!1, this[_0xf8ed[139]])) : this[_0xf8ed[139]][_0xf8ed[80]](f));
                        for (var _ = 0; _ < this[_0xf8ed[46]]; _++) this[_0xf8ed[78]](_ > 0, this[_0xf8ed[139]]);
                        this[_0xf8ed[46]] = 0
                    }, this[_0xf8ed[172]] = function () {
                        this[_0xf8ed[102]]++
                    }, this[_0xf8ed[173]] = function () {
                        this[_0xf8ed[102]] > 0 && this[_0xf8ed[102]]--
                    }
                }, this
            })[_0xf8ed[167]](f, r, n, a, o);;) {
            var k = t[_0xf8ed[156]]();
            if (t[_0xf8ed[42]] = k[0], t[_0xf8ed[45]] = k[1], t[_0xf8ed[45]] === _0xf8ed[83]) break;
            switch (t[_0xf8ed[45]]) {
                case _0xf8ed[174]:
                    t[_0xf8ed[78]](!1, t[_0xf8ed[139]]), t[_0xf8ed[169]](t[_0xf8ed[42]]), t[_0xf8ed[47]] && (!t[_0xf8ed[5]] && t[_0xf8ed[42]][_0xf8ed[166]](/<body(?:.*)>/) || !t[_0xf8ed[6]] && t[_0xf8ed[42]][_0xf8ed[166]](/<head(?:.*)>/) || t[_0xf8ed[172]](), t[_0xf8ed[47]] = !1), t[_0xf8ed[37]] = _0xf8ed[38];
                    break;
                case _0xf8ed[158]:
                case _0xf8ed[157]:
                    t[_0xf8ed[78]](!1, t[_0xf8ed[139]]), t[_0xf8ed[169]](t[_0xf8ed[42]]), t[_0xf8ed[37]] = _0xf8ed[38];
                    break;
                case _0xf8ed[175]:
                    if (t[_0xf8ed[43]] === _0xf8ed[160] && t[_0xf8ed[44]] === _0xf8ed[0]) {
                        var m = (t[_0xf8ed[42]][_0xf8ed[166]](/\w+/) || [])[0],
                            A = null;
                        t[_0xf8ed[139]][_0xf8ed[19]] && (A = t[_0xf8ed[139]][t[_0xf8ed[139]][_0xf8ed[19]] - 1][_0xf8ed[166]](/(?:<|{{#)\s*(\w+)/)), (null === A || A[1] !== m && !t[_0xf8ed[48]][_0xf8ed[74]](A[1], u)) && t[_0xf8ed[78]](!1, t[_0xf8ed[139]])
                    }
                    t[_0xf8ed[169]](t[_0xf8ed[42]]), t[_0xf8ed[37]] = _0xf8ed[38];
                    break;
                case _0xf8ed[176]:
                    var E = t[_0xf8ed[42]][_0xf8ed[166]](/^\s*<([a-z-]+)/i);
                    E && t[_0xf8ed[48]][_0xf8ed[74]](E[1], u) || t[_0xf8ed[78]](!1, t[_0xf8ed[139]]), t[_0xf8ed[169]](t[_0xf8ed[42]]), t[_0xf8ed[37]] = _0xf8ed[38];
                    break;
                case _0xf8ed[177]:
                    for (var N = !1, I = t[_0xf8ed[139]][_0xf8ed[19]] - 1; I >= 0 && t[_0xf8ed[139]][I] !== _0xf8ed[31]; I--)
                        if (t[_0xf8ed[139]][I][_0xf8ed[166]](/{{#if/)) {
                            N = !0;
                            break
                        } N || t[_0xf8ed[78]](!1, t[_0xf8ed[139]]), t[_0xf8ed[169]](t[_0xf8ed[42]]), t[_0xf8ed[47]] && (t[_0xf8ed[172]](), t[_0xf8ed[47]] = !1), t[_0xf8ed[37]] = _0xf8ed[38];
                    break;
                case _0xf8ed[88]:
                case _0xf8ed[160]:
                    t[_0xf8ed[169]](t[_0xf8ed[42]]), t[_0xf8ed[37]] = _0xf8ed[161];
                    break;
                case _0xf8ed[178]:
                case _0xf8ed[179]:
                    if (t[_0xf8ed[42]] !== _0xf8ed[0]) {
                        t[_0xf8ed[78]](!1, t[_0xf8ed[139]]);
                        var S, K = t[_0xf8ed[42]],
                            G = 1;
                        t[_0xf8ed[45]] === _0xf8ed[179] ? S = typeof d === _0xf8ed[180] && d : t[_0xf8ed[45]] === _0xf8ed[178] && (S = typeof x === _0xf8ed[180] && x), _[_0xf8ed[181]] === _0xf8ed[182] ? G = 0 : _[_0xf8ed[181]] === _0xf8ed[183] && (G = -t[_0xf8ed[102]]);
                        var L = t[_0xf8ed[163]](G);
                        if (S) {
                            var j = function () {
                                this[_0xf8ed[30]] = _0xf8ed[31]
                            };
                            j[_0xf8ed[184]] = _;
                            var R = new j;
                            K = S(K[_0xf8ed[1]](/^\s*/, L), R)
                        } else {
                            var C = K[_0xf8ed[166]](/^\s*/)[0][_0xf8ed[166]](/[^\n\r]*$/)[0][_0xf8ed[28]](t[_0xf8ed[164]])[_0xf8ed[19]] - 1,
                                D = t[_0xf8ed[163]](G - C);
                            K = K[_0xf8ed[1]](/^\s*/, L)[_0xf8ed[1]](/\r\n|\r|\n/g, _0xf8ed[31] + D)[_0xf8ed[1]](/\s+$/, _0xf8ed[0])
                        }
                        K && (t[_0xf8ed[170]](K), t[_0xf8ed[78]](!0, t[_0xf8ed[139]]))
                    }
                    t[_0xf8ed[37]] = _0xf8ed[161];
                    break;
                default:
                    t[_0xf8ed[42]] !== _0xf8ed[0] && t[_0xf8ed[169]](t[_0xf8ed[42]])
            }
            t[_0xf8ed[43]] = t[_0xf8ed[45]], t[_0xf8ed[44]] = t[_0xf8ed[42]]
        }
        var O = t[_0xf8ed[139]][_0xf8ed[82]](_0xf8ed[0])[_0xf8ed[1]](/[\r\n\t ]+$/, _0xf8ed[0]);
        return g && (O += _0xf8ed[31]), y !== _0xf8ed[31] && (O = O[_0xf8ed[1]](/[\n]/g, y)), O
    }
    if (typeof define === _0xf8ed[180] && define[_0xf8ed[185]]) define([_0xf8ed[186], _0xf8ed[187], _0xf8ed[188]], function (e) {
        var _ = e(_0xf8ed[187]),
            d = e(_0xf8ed[188]);
        return {
            html_beautify: function (e, x) {
                return f(e, x, _[_0xf8ed[189]], d[_0xf8ed[190]])
            }
        }
    });
    else if (typeof exports !== _0xf8ed[191]) {
        var _ = require(_0xf8ed[192]),
            d = require(_0xf8ed[193]);
        exports[_0xf8ed[194]] = function (e, x) {
            return f(e, x, _[_0xf8ed[189]], d[_0xf8ed[190]])
        }
    } else typeof window !== _0xf8ed[191] ? window[_0xf8ed[194]] = function (e, _) {
        return f(e, _, window[_0xf8ed[189]], window[_0xf8ed[190]])
    } : typeof global !== _0xf8ed[191] && (global[_0xf8ed[194]] = function (e, _) {
        return f(e, _, global[_0xf8ed[189]], global[_0xf8ed[190]])
    })
}();