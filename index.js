#!/usr/bin/env node

var Fc00rc = require("fc00rc");
var PadIpv6 = require('pad-ipv6');
var Addr = require("fc00-addr");

var args = process.argv.slice(2);

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
            var addrs = Addr();
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
                console.log(addrs[0]);
                process.exit(0);
            }
        }());
        break;
    case 'init':
        (function () {
            if (Fc00rc.exists()) {
                console.error("%s already exists", Fc00rc.path);
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
            console.log("Creating %s", Fc00rc.path);
            Fc00rc.read();
            process.exit(0);
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

                var padded = PadIpv6(args[1]);

                console.log(padded);
                process.exit(0);
            }
            console.error("Insufficient arguments provided. Try `fc00 pretty <ipv6>`");
            process.exit(0);
        }());
        break;
    default:
        helpMenu();
}
