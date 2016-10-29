module.exports = function (Fc00, L10n) {
    return function (args) {
        if (Fc00.rc.exists()) {
            console.error(L10n.render('e_exists', [Fc00.rc.path]));
            process.exit(1);
        }

        var profile;
        if (!Fc00.rc.profile.exists('default')) {
            profile = Fc00.profile.create();
            profile.setSaneDefaults();
        }

        console.log(L10n.render('initializing'));
        Fc00.rc.init({}, profile);
        process.exit(0);
    };
};
