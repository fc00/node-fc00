module.exports = function (Fc00, L10n) {
    return function () {
        console.log("Try one of: ");
        [
        "help",
        "init",
        "addr",
        "pad <ipv6>",
        "keys convert <publicKey || privateKey> ...",
        "keys keyPair",
        "version",
        ].forEach(function (cmd) { console.log("\tfc00 " + cmd); });
        return 0;
    };
};
