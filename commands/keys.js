module.exports = function (Fc00, L10n) {
    return function (args) {
        args = args.slice(1);

        if (!args.length) {
            console.error(L10n.render('h_keys'));
            process.exit(1);
        }

        var next = args.shift();

        var errored;

        if (next === 'convert') {
            if (!args.length) {
                console.error(L10n.render('e_insufficient_args'));
                console.error(L10n.render('e_expected_keys'));
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
    };
};
