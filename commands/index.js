var Fc00 = require("../lib/");
var L10n = require("../l10n/");
var Cmd = module.exports = {};

[
    'help',
    'version',
    'keys',
    'profile',
    'init',
    'address',
].forEach(function (k) {
    Cmd[k] = require("./" + k)(Fc00, L10n);
});

