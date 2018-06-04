/**
 * SSOController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const SamlStrategy = require('passport-saml').Strategy;
const passport = require('passport');

function ssoRedirect(req, res) {
    const opts = {
        path: '/login/callback',
        entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
        issuer: 'passport-saml'
    };

    passport.use(new SamlStrategy(opts, (profile, done) => {
        // 查询用户是否存在，如果存在则返回
        let user = profile;
        return done(null, user);
    }));

    passport.authenticate('saml', {

    })(req, res, null);
}

function ssoCallback(req, res) {
    passport.authenticate('saml', {}, (err, profile, info) => {
        if (err) {
            return res.forbidden(err);
        }
        if (!profile) {
            return res.forbidden(info);
        }
        // 校验user是否存在

        let user = profile;
        // 如果存在则使用
        req.login(user, (err) => {
            if (err) {
                return res.forbidden(err);
            }
            return res.redirect('/');
        })
    })(req, res, null);
}

module.exports = {
    ssoRedirect,
    ssoCallback
};

