#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

var Fc00 = require("./lib/");
var L10n = require("./l10n/");
var Cmd = require("./commands/");

var args = process.argv.slice(2);

(function () {
// if not called from the command line, export as a module, terminate
if (require.main !== module) { return module.exports = Fc00; }

// don't bother translating this junk
if (!/node/.test(process.argv[0])) {
    throw new Error("Expected first argument to be node, got "+ process.argv[0]);
}
if (!/(fc00|index)/.test(process.argv[1])) {
    throw new Error("Expected second argument to be fc00, got " + process.argv[1]);
}

if (!args.length) { process.exit(Cmd.help(args)); }

switch (args[0]) {
    case 'address':
    case 'addr':
    case 'a':
        process.exit(Cmd.address(args));
    case 'init':
        process.exit(Cmd.init(args));
    case 'profile':
        process.exit(Cmd.profile(args));
    case 'keys':
        Cmd.keys(args, function (code) {
            process.exit(code);
        });
        break;
    case 'install':
    case 'update':
    case 'genconf':
    case 'peer':
        console.error(L10n.render('e_not_implemented', [args[0]]));
        process.exit(1);
    case 'up':
    case 'start':
        process.exit(Cmd.start(args));
    case 'down':
    case 'stop':
        process.exit(Cmd.stop(args));
    case 'pad':
    case 'pretty':
        Cmd.pad(args, function (code) {
            process.exit(code);
        });
        break;
    case 'version':
    case 'v':
        process.exit(Cmd.version(args));
    case 'help':
    case 'h':
    default:
        process.exit(Cmd.help(args));
}

}());
