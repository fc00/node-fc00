#!/usr/bin/env node

var Fc00 = require("./lib/");

var args = process.argv.slice(2);

(function () {
// if not called from the command line, export as a module, terminate
if (require.main !== module) { return module.exports = Fc00; }

if (!/node/.test(process.argv[0])) {
    throw new Error("Expected first argument to be node, got "+ process.argv[0]);
}
if (!/(fc00|index)/.test(process.argv[1])) {
    throw new Error("Expected second argument to be fc00, got " + process.argv[1]);
}

var helpMenu = function () {
    console.log("Try one of: ");
    [
    "help",
    "init",
    "addr",
    "pad <ipv6>",
    "keys convert <publicKey OR privateKey> ...",
    "keys keyPair",
    "version",
    ].forEach(function (cmd) { console.log("\tfc00 " + cmd); });

    process.exit(1);
};

if (!args.length) { helpMenu(); }

switch (args[0]) {
    case 'help':
    case 'h':
        helpMenu();
        process.exit(0);
        break;
    case 'addr':
    case 'a':
        (function () {
            var addrs = Fc00.addr();
            if (!addrs.length) {
                console.log("Couldn't find an fc00 address");
                process.exit(1);
            }
            if (addrs.length >= 2) {
                console.log("Multiple fc addresses detected. Exiting");
                console.log(addrs);
                process.exit(1);
            }
            if (addrs.length === 1) {
                console.log(Fc00.padIpv6(addrs[0]));
                process.exit(0);
            }
        }());
        break;
    case 'init':
        (function () {
            if (Fc00.rc.exists()) {
                console.error("%s already exists", Fc00.rc.path);
                process.exit(1);
            }

            var profile;
            if (!Fc00.rc.profile.exists('default')) {
                profile = Fc00.profile.create();
                profile.setSaneDefaults();
            }

            console.log("Initializing fc00");
            Fc00.rc.init({}, profile);
            process.exit(0);
        }());
        break;

    case 'profile':
        (function () {
            var nope = function (p) {
                console.error("%s doesn't exist. Try running 'fc00 init'", p);
                process.exit(1);
            };

            if (!Fc00.rc.exists()) { nope(Fc00.rc.path); }

            var rc = Fc00.rc.read();
            var p = rc.profile;

            if (!Fc00.rc.profile.exists(p)) { nope(Fc00.rc.profile.path(p)); }

            var profile = Fc00.rc.profile.read(p);

            var parsed;
            try {
                parsed = JSON.parse(profile);
            } catch (err) {
                console.error("profile is not valid json!");
                process.exit(1);
            }

            console.log(JSON.stringify(parsed));
            process.exit(0);
        }());
        break;
    case 'keys':
        (function () {
            args.shift();


            if (!args.length) {
                console.error("fc00 keys:\n\tconvert private keys to public keys,\n\tand public keys to IP addresses");
                process.exit(1);
            }

            var next = args.shift();

            var errored;

            if (next === 'convert') {
                if (!args.length) {
                    console.log("Nothing to convert");
                    process.exit(1);
                }

                args.forEach(function (arg) {
                    try {
                        if (arg.length === 64 && !/[^a-f0-9]/i.test(arg)) {
                            // it might be a private key
                            console.log(Fc00.keys.privateToPublic(arg));
                        }
                        else if (arg.length === 54 && /\.k$/.test(arg)) {
                            console.log(Fc00.padIpv6(Fc00.keys.publicToIp6(arg)));
                        } else {
                            console.error('invalid input: %s', arg);
                            errored = true;
                        }
                    } catch (err) {
                        console.error(err);
                        errored = true;
                    }
                });
                process.exit(errored?1: 0);
            } else if (['generate', 'keyPair'].indexOf(next) !== -1) {
                // TODO maybe inject these keys into a profile?

                var keys = Fc00.keys.keyPair();
                console.log();
                ['privateKey', 'publicKey', 'ip6'].forEach(function (k) {
                    console.log("%s:%s%s", k, Array(12-k.length).fill(" ").join(""),  keys[k]);
                });
                process.exit(0);
            } else {
                console.log("Not implemented yet");
            }

            process.exit(1);
        }());
        break;
    case 'install':
    case 'update':
    case 'genconf':
    case 'peer':
        (function () {
            console.error("Not implented yet");
            process.exit(1);
        }());
        break;
    case 'up':
    case 'down':
        console.log("`fc00 %s` is not implemented yet", args[0]);
        break;
    case 'pad':
    case 'pretty':
        (function () {
            if (args[1]) {
                if (/[^a-f0-9:]/.test(args[1])) {
                    console.error("Expected ipv6 address, got " + args[1]);
                    process.exit(1);
                }

                var padded = Fc00.padIpv6(args[1]);

                console.log(padded);
                process.exit(0);
            }
            console.error("Insufficient arguments provided. Try `fc00 pretty <ipv6>`");
            process.exit(0);
        }());
        break;
    case 'version':
    case 'v':
        (function () {
            console.log(Fc00.version());
        }());
        break;
    default:
        helpMenu();
}

}());
