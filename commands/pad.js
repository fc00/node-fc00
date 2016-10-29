module.exports = function (Fc00, L10n) {
    return function (args) {
        if (args[1]) {
            if (/[^a-f0-9:]/.test(args[1])) {
                console.error(L10n.render('e_expected_ip6'));
                return 1;
            }

            var padded = Fc00.padIpv6(args[1]);

            console.log(padded);
            return 0;
        }
        console.error(L10n.render('e_insufficient_args'));
        console.error(L10n.render('h_pad'));
        return 0;
    };
};
