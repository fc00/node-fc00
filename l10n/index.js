var S = module.exports = {};
var Util = require("./util");
var ansuz = require("ansuz");

Object.keys(Util).forEach(function (k) { S[k] = Util[k]; });

S.data = {
    default: 'en',
    en: require("./en/"),
    fr: require("./fr/"),
};

S.useDefault = function (o) {
    return o[o.default];
};

var isString = S.isString = function (s) { return typeof(s) === 'string'; };

S.getString = function (key, lo) {
    if (!key) { return ''; }
    lo = lo || S.guessLanguage();

    var lang = lo[0];
    var dialect = lo[1];

    var dict = S.data[lang];

    var guess;

    // use the key from your preferred dialect if it's defined
    guess = ansuz.find(S.data, [lang, dialect, key]);
    if (isString(guess)) { return guess; }

    // otherwise use the key from the default dialect for your language
    if (S.data[lang]) {
        guess = ansuz.find(S.data, [lang, S.data[lang].default, key]);
        if (isString(guess)) { return guess; }
    }

    // otherwise fall back to the default language
    guess = ansuz.find(S.useDefault(S.useDefault(S.data)), ['key']);
    if (isString(guess)) { return guess; }

    throw new Error("Couldn't find any example of the specified localization string");
};

S.render = function (key, args, lo) {
    var s = S.getString(key, lo);
    return Util.template(s, args);
};
