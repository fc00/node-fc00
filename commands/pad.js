module.exports = function (Fc00, L10n, Reader) {
    var each = function (arg) {
        if (/[^a-f0-9:]/.test(arg)) {
            console.error(L10n.render('e_expected_ip6'));
            return 1;
        }
        var padded = Fc00.padIpv6(arg);
        console.log(padded);
    };

    return function (args, cb) {
        var rem = args.slice(1);

        if (rem.length) {
            var error = args.some(each);
            cb(error?1:0);
        }
        else {
            Reader.getPipeData(function (e, data) {
                if (!data) {
                    console.error(L10n.render('e_insufficient_args'));
                    console.error(L10n.render('h_pad'));
                    cb(1);
                    return;
                }
                var rem = data.split(/\s+/);
                var error = rem.filter(function (x) { return x; }).some(each);
                cb(error?1:0);
            });
        }
    };
};
