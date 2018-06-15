"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_saml_1 = require("passport-saml");
const _ = require("lodash");
const sails = require("sails");
const passport = require("../services/passport");
const UserService = require("../services/UserService");
function loadSamlStrategy(strategyName, opts) {
    passport.use(new passport_saml_1.Strategy(opts, (profile, done) => {
        let user = profile;
        return done(null, user);
    }));
    return passport._strategy(strategyName);
}
async function ssoRedirect(req, res) {
    try {
        var orgInfo = await UserService.getOrgByDomain(req);
    }
    catch (error) {
        return res.forbidden(error);
    }
    if (!orgInfo || orgInfo.default) {
        return res.view('login');
    }
    if (orgInfo.status != 1) {
        return res.forbidden(new Error('The Org is forbidden'));
    }
    if (!orgInfo.sso) {
        return res.view('login');
    }
    let strategyName = `samlstrategy-${orgInfo.id}`;
    let opts = {
        issuer: orgInfo.idp.issuer,
        entryPoint: orgInfo.idp.entrypoint,
        callbackUrl: orgInfo.domain + orgInfo.idp.acs,
        cert: orgInfo.idp.x509cert,
        logoutUrl: orgInfo.idp.slo,
        name: strategyName,
    };
    let samlStrategy = loadSamlStrategy(strategyName, opts);
    passport.authenticate(strategyName, {})(req, res, (err, data) => { });
}
exports.ssoRedirect = ssoRedirect;
function ssoCallback(req, res) {
    let strategyName = req.param('id').trim().toLowerCase();
    let currentOid = Number(strategyName.split('-')[1]);
    passport.authenticate(strategyName, {}, async (err, profile, info) => {
        if (err) {
            return res.forbidden(err);
        }
        if (!profile) {
            return res.forbidden(info);
        }
        sails.log.info(profile);
        try {
            var uinfo = await UserService.checkUser(req, { email: profile.nameID });
        }
        catch (err) {
            return res.forbidden(err);
        }
        let notmatch = true;
        if (uinfo && uinfo.organizations) {
            for (let i = 0, max = uinfo.organizations.length; i < max; i++) {
                let org = uinfo.organizations[i];
                if (org.id === currentOid && org.org_status === 1 && org.user_status === 1) {
                    notmatch = false;
                    break;
                }
            }
        }
        if (notmatch) {
            uinfo = await UserService.addMember2Org(req, {
                email: profile.nameID,
                oid: currentOid
            });
        }
        try {
            var user = await UserService.loginV2(req, {
                uid: uinfo.uid,
                oid: currentOid
            });
        }
        catch (err) {
            return res.serverError(err);
        }
        user = _.extend(user, {
            nameID: profile.nameID,
            nameIDFormat: profile.nameIDFormat,
            sessionIndex: profile.sessionIndex,
            nameQualifier: profile.nameQualifier,
            spNameQualifier: profile.spNameQualifier
        });
        req.login(user, (err) => {
            if (err) {
                return res.forbidden(err);
            }
            return res.redirect('/');
        });
    })(req, res, req.next);
}
exports.ssoCallback = ssoCallback;
async function LogoutRedirect(req, res) {
    let orgInfo = {};
    try {
        orgInfo = await UserService.getOrgByDomain(req);
    }
    catch (error) {
        return res.forbidden(error);
    }
    if (!orgInfo || orgInfo.default) {
        req.logout();
        return res.redirect('login');
    }
    if (orgInfo.status != 1) {
        return res.forbidden(new Error('The Org is forbidden'));
    }
    if (!orgInfo.sso) {
        req.logout();
        return res.redirect('login');
    }
    let strategyName = `samlstrategy-${orgInfo.id}`;
    let opts = {
        issuer: orgInfo.idp.issuer,
        entryPoint: orgInfo.idp.entrypoint,
        callbackUrl: orgInfo.domain + orgInfo.idp.acs,
        cert: orgInfo.idp.x509cert,
        logoutUrl: orgInfo.idp.slo,
        name: strategyName,
    };
    let samlStrategy = loadSamlStrategy(strategyName, opts);
    samlStrategy.logout(req, function (err, requestUrl) {
        req.logout();
        return res.redirect(requestUrl);
    });
}
exports.LogoutRedirect = LogoutRedirect;
async function generateSPMetadata(req, res) {
    let orgInfo = {};
    try {
        orgInfo = await UserService.getOrgByDomain(req);
    }
    catch (error) {
        return res.forbidden(error);
    }
    if (orgInfo.default) {
        return res.forbidden(new Error('invalid domain'));
    }
    if (orgInfo.status != 1) {
        return res.forbidden(new Error('invalid domain'));
    }
    if (!orgInfo.sso) {
        return res.forbidden(new Error('invalid domain'));
    }
    let strategyName = `samlstrategy-${orgInfo.id}`;
    let opts = {
        issuer: orgInfo.idp.issuer,
        entryPoint: orgInfo.idp.entrypoint,
        callbackUrl: orgInfo.domain + orgInfo.idp.acs,
        cert: orgInfo.idp.x509cert,
        logoutUrl: orgInfo.idp.slo,
        name: strategyName,
    };
    let samlStrategy = loadSamlStrategy(strategyName, opts);
    let metadata = samlStrategy.generateServiceProviderMetadata();
    return res.type('xml').send(metadata);
}
exports.generateSPMetadata = generateSPMetadata;
function LogoutCallback(req, res) {
    req.logout();
    return res.redirect(sails.config.entry.login);
}
