module.exports = function (Fc00, L10n) {
    return function (args) {
        var nope = function (p) {
            console.error(L10n.render('e_no_exists', [p]));
            console.error(L10n.render('h_try_init'));
            return 1;
        };

        if (!Fc00.rc.exists()) { nope(Fc00.rc.path); }

        var rc = Fc00.rc.read();
        var p = rc.profile || 'default';

        if (!Fc00.rc.profile.exists(p)) { nope(Fc00.rc.profile.path(p)); }

        var profile = Fc00.rc.profile.read(p);

        var parsed;
        try {
            parsed = JSON.parse(profile);
        } catch (err) {
            console.error(L10n.render('e_profile_invalid'));
            return 1;
        }

        console.log(JSON.stringify(parsed));
        return 0;
    };
};
