module.exports = function (Fc00, L10n, Reader) {
    var converter = function (arg) {
        try {
            if (/^".*"$/.test(arg)) {
                arg = arg.replace(/^"/, '').replace(/"$/, '');
            }

            if (arg.length === 64 && !/[^a-f0-9]/i.test(arg)) {
                // it might be a private key
                console.log(Fc00.keys.privateToPublic(arg));
            }
            else if (arg.length === 54 && /\.k$/.test(arg)) {
                console.log(Fc00.padIpv6(Fc00.keys.publicToIp6(arg)));
            } else {
                console.error('invalid input: %s', arg);
                return 1;
            }
        }
        catch (err) { return 1; }
    };

    return function (orig, cb) {
        args = orig.slice(1);

        if (!args.length) {
            console.error(L10n.render('h_keys'));
            return void cb(1);
        }

        var next = args.shift();

        if (next === 'convert') {
            if (!args.length) {

                Reader.getPipeData(function (e, data) {
                    if (!data) {
                        console.error(L10n.render('e_insufficient_args'));
                        console.error(L10n.render('e_expected_keys'));
                        return void cb(1);
                    }

                    var rem = data.split(/\s+/).filter(function (x) { return x; });

                    var error = rem.some(converter);
                    return void cb(error?1:0);
                });
                return;
            }

            var error = args.some(converter);
            return void cb(error?1:0);
        } else if (['generate', 'keyPair'].indexOf(next) !== -1) {
            // TODO maybe inject these keys into a profile?

            var keys = Fc00.keys.keyPair();
            console.log();
            ['privateKey', 'publicKey', 'ip6'].forEach(function (k) {
                console.log("%s:%s%s", k, Array(12-k.length).fill(" ").join(""),  keys[k]);
            });
            return void cb(0);
        } else {
            console.error(L10n.render('e_not_implemented', [orig.join(' ')]));
            return void cb(1);
        }
    };
};
