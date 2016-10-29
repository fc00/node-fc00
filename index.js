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
    case 'help':
    case 'h':
        Cmd.help(args);
        process.exit(0);
        break;
    case 'addr':
    case 'a':
        Cmd.address(args);
        break;
    case 'init':
        Cmd.init(args);
        break;
    case 'profile':
        Cmd.profile(args);
        break;
    case 'keys':
        Cmd.keys(args);
        break;
    case 'install':
    case 'update':
    case 'genconf':
    case 'peer':
        console.error(L10n.render('e_not_implemented', [args[0]]));
        process.exit(1);
        break;
    case 'up':
    case 'down':
        console.error(L10n.render('e_not_implemented', [args[0]]));
        process.exit(1);
        break;
    case 'pad':
    case 'pretty':
        Cmd.pad(args);
        break;
    case 'version':
    case 'v':
        Cmd.version(args);
        break;
    default:
        Cmd.help(args);
}

}());
