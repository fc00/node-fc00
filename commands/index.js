var Fc00 = require("../lib/");
var L10n = require("../l10n/");
var Reader = require("../lib/reader");

var Cmd = module.exports = {};

[
    'help',
    'pad',
    'version',
    'keys',
    'profile',
    'init',
    'address',
    'start',
    'stop',
].forEach(function (k) {
    Cmd[k] = require("./" + k)(Fc00, L10n, Reader);
});

