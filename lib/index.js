var Package = require("../package.json");

var Fc00 = module.exports = {};

Fc00.addr = require("fc00-addr");

Fc00.rc = require("fc00rc");

Fc00.padIpv6 = require("pad-ipv6");

Fc00.keys = require("cjdnskeys");

Fc00.profile = require("fc00-profile");

Fc00.peer = {
    client: require("fc00-peers-client"),
};

Fc00.version = function () {
    return Package.version;
};
