#!/usr/bin/env node

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

if (!args.length) { Cmd.help(args); }

switch (args[0]) {
    case 'addr':
    case 'a':
        process.exit(Cmd.address(args));
    case 'init':
        process.exit(Cmd.init(args));
    case 'profile':
        process.exit(Cmd.profile(args));
    case 'keys':
        process.exit(Cmd.keys(args));
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
        process.exit(Cmd.pad(args));
    case 'version':
    case 'v':
        process.exit(Cmd.version(args));
    case 'help':
    case 'h':
    default:
        process.exit(Cmd.help(args));
}

}());
