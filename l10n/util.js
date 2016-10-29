var S = module.exports;
var ansuz = require("ansuz");

var getLocale = S.getLocale = function () {
    var e = process.env;
    return e.LC_NAME || e.LANG;
};

S.guessLanguage = function (s) {
    s = typeof(s) === 'string' && s?s: getLocale();

    // strip off .UTF-8 so we only have things like en_US
    var parts = s.replace(/\..*$/, '').split(/_/);

    // default language is english because that's what I speak
    return parts.length?parts:['en'];
};

S.template = function (s, o, p) {
    if (!o) { return s; }
    p = p || /\{(.*)?\}/g;

    if (ansuz.isArray(o)) {
        var I = 0;
        return s.replace(p, function (a, b) {
            return o[I++] || a;
        });
    }
    return s.replace(p, function (a, b) {
        return o[b] || a;
    });
};

