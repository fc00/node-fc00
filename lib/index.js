var Package = require("../package.json");

var Fc00 = module.exports = {};

Fc00.addr = require("fc00-addr");

Fc00.rc = require("fc00rc");

Fc00.padIpv6 = require("pad-ipv6");


Fc00.version = function () {
    return Package.version;
};
