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
    "init",
    "addr",
    "pad",
    ].forEach(function (cmd) { console.log("\tfc00 " + cmd); });

    process.exit(1);
};

if (!args.length) { helpMenu(); }

switch (args[0]) {
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

            /* TODO
             * set a path to a cjdns repository
             * make .fc00 in your home folder
             * ~/.fc00rc
             * ~/.fc00
             * ~/.fc00/config
             *
             */
            console.log("Creating %s", Fc00.rc.path);
            Fc00.rc.read();
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
