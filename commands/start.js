module.exports = function (Fc00, L10n) {
    return function (args) {
        console.error(L10n.render('e_not_implemented', [args.join(' ')]))
        return 1;
    };
};
