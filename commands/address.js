module.exports = function (Fc00, L10n) {
    return function (args) {
        var addrs = Fc00.addr();
        if (!addrs.length) {
            console.error(L10n.render('e_no_fc00_ip6'));
            return 1;
        }
        if (addrs.length >= 2) {
            console.error(L10n.render('e_multi_fc00_ip6'));
            console.log(addrs);
            console.error(L10n.render('exiting'));
            return 1;
        }
        if (addrs.length === 1) {
            console.log(Fc00.padIpv6(addrs[0]));
            return 0;
        }
    };
};
