/**
 * SSOController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


/**
 * Issuer URL:
 * https://app.onelogin.com/saml/metadata/796983
 * SAML 2.0 Endpoint (HTTP):
 * https://cobolbaby-dev.onelogin.com/trust/saml2/http-post/sso/796983
 * SLO Endpoint (HTTP):
 * https://cobolbaby-dev.onelogin.com/trust/saml2/http-redirect/slo/796983
 * X.509 Certificate:
 * -----BEGIN CERTIFICATE-----
MIIEHTCCAwWgAwIBAgIUEPGXZz5ErndhS42mvxwy4zsfGAcwDQYJKoZIhvcNAQEF
BQAwWjELMAkGA1UEBhMCVVMxEjAQBgNVBAoMCWNvYm9sYmFieTEVMBMGA1UECwwM
T25lTG9naW4gSWRQMSAwHgYDVQQDDBdPbmVMb2dpbiBBY2NvdW50IDEyODM4NjAe
Fw0xODA2MDUwOTI1NDhaFw0yMzA2MDUwOTI1NDhaMFoxCzAJBgNVBAYTAlVTMRIw
EAYDVQQKDAljb2JvbGJhYnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UE
AwwXT25lTG9naW4gQWNjb3VudCAxMjgzODYwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQC1IeJCRFDUc49xH8NOGqsaRpBxUZRW3T5b5u4bml/VyZ6ZmKE7
oYH1fOdnfu5jUpW7yvO0xg/V0KMw80d/g1Ghl88aQNaupxOwL6WtC0q0lwXZoHNj
yNPAE1yRDtQ15lLlO2OKAeiBkPeZYQEORYG+nhibvAIOKfakA76CE82i8tGrRgyo
3iL64VqH58S+bBFFv0lwscocRqVI8kYaIdx7Go1PIxdgt2K3VmgAZ8M6ugjnuhTw
0/PRTQ6t0IDfIU2E3myolvLu+Fei+Qk/fwn9FuI2qyewQsnE+9Ge3LuwzWtO5iCi
E+ZlI5zSvIkqp284cl4M8WhEI3GRPT73dMhZAgMBAAGjgdowgdcwDAYDVR0TAQH/
BAIwADAdBgNVHQ4EFgQUv9iUizoygX2/Mo10mHqKM5b70uAwgZcGA1UdIwSBjzCB
jIAUv9iUizoygX2/Mo10mHqKM5b70uChXqRcMFoxCzAJBgNVBAYTAlVTMRIwEAYD
VQQKDAljb2JvbGJhYnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UEAwwX
T25lTG9naW4gQWNjb3VudCAxMjgzODaCFBDxl2c+RK53YUuNpr8cMuM7HxgHMA4G
A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQUFAAOCAQEAhOTNvE8REZ6aoKoX58SF
LSSLHcDJ0bybz+tY8ccVRRrugNU4SY0gkestnXiYCNi9KQkvKZMbw0vQx5+Y5e+1
67lGMYFdyCSLUfZot9y6KI3V2r6RpbTpPcu5FfB64BV2JjWx4WsRh18pXyDXdB77
xFz8YwgyZfcifw1Ecln8xCJlRZpaq/iFMJaYP2kLdJn97M0wm8M0yKe64VSQTKVi
WLJ5uPDAkvuMnNWR4KIsYMfb5tEpSJWlzcSM1WfGBNtQVKpjyusMeXj0beG+GF9B
o0CCK33HzIeVVTYNeIkupdNGcPn8ofoS2aOIcHMaDvGShd47wf8OiFv0tgvwtAIG
7g==
-----END CERTIFICATE-----

 */
const SamlStrategy = require('passport-saml').Strategy;
const passport = require('passport');

function ssoRedirect(req, res) {
    const opts = {
        callbackUrl: 'http://cobol.chart2.com:1337/api/sso/saml2/acs/demo1',
        entryPoint: 'https://cobolbaby-dev.onelogin.com/trust/saml2/http-post/sso/796983',
        issuer: 'passport-saml',
        cert: `-----BEGIN CERTIFICATE-----
        MIIEHTCCAwWgAwIBAgIUEPGXZz5ErndhS42mvxwy4zsfGAcwDQYJKoZIhvcNAQEF
        BQAwWjELMAkGA1UEBhMCVVMxEjAQBgNVBAoMCWNvYm9sYmFieTEVMBMGA1UECwwM
        T25lTG9naW4gSWRQMSAwHgYDVQQDDBdPbmVMb2dpbiBBY2NvdW50IDEyODM4NjAe
        Fw0xODA2MDUwOTI1NDhaFw0yMzA2MDUwOTI1NDhaMFoxCzAJBgNVBAYTAlVTMRIw
        EAYDVQQKDAljb2JvbGJhYnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UE
        AwwXT25lTG9naW4gQWNjb3VudCAxMjgzODYwggEiMA0GCSqGSIb3DQEBAQUAA4IB
        DwAwggEKAoIBAQC1IeJCRFDUc49xH8NOGqsaRpBxUZRW3T5b5u4bml/VyZ6ZmKE7
        oYH1fOdnfu5jUpW7yvO0xg/V0KMw80d/g1Ghl88aQNaupxOwL6WtC0q0lwXZoHNj
        yNPAE1yRDtQ15lLlO2OKAeiBkPeZYQEORYG+nhibvAIOKfakA76CE82i8tGrRgyo
        3iL64VqH58S+bBFFv0lwscocRqVI8kYaIdx7Go1PIxdgt2K3VmgAZ8M6ugjnuhTw
        0/PRTQ6t0IDfIU2E3myolvLu+Fei+Qk/fwn9FuI2qyewQsnE+9Ge3LuwzWtO5iCi
        E+ZlI5zSvIkqp284cl4M8WhEI3GRPT73dMhZAgMBAAGjgdowgdcwDAYDVR0TAQH/
        BAIwADAdBgNVHQ4EFgQUv9iUizoygX2/Mo10mHqKM5b70uAwgZcGA1UdIwSBjzCB
        jIAUv9iUizoygX2/Mo10mHqKM5b70uChXqRcMFoxCzAJBgNVBAYTAlVTMRIwEAYD
        VQQKDAljb2JvbGJhYnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UEAwwX
        T25lTG9naW4gQWNjb3VudCAxMjgzODaCFBDxl2c+RK53YUuNpr8cMuM7HxgHMA4G
        A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQUFAAOCAQEAhOTNvE8REZ6aoKoX58SF
        LSSLHcDJ0bybz+tY8ccVRRrugNU4SY0gkestnXiYCNi9KQkvKZMbw0vQx5+Y5e+1
        67lGMYFdyCSLUfZot9y6KI3V2r6RpbTpPcu5FfB64BV2JjWx4WsRh18pXyDXdB77
        xFz8YwgyZfcifw1Ecln8xCJlRZpaq/iFMJaYP2kLdJn97M0wm8M0yKe64VSQTKVi
        WLJ5uPDAkvuMnNWR4KIsYMfb5tEpSJWlzcSM1WfGBNtQVKpjyusMeXj0beG+GF9B
        o0CCK33HzIeVVTYNeIkupdNGcPn8ofoS2aOIcHMaDvGShd47wf8OiFv0tgvwtAIG
        7g==`,
        logoutUrl: 'https://cobolbaby-dev.onelogin.com/trust/saml2/http-redirect/slo/796983'
    };

    passport.use(new SamlStrategy(opts, (profile, done) => {
        // 查询用户是否存在，如果存在则返回
        let user = profile;
        return done(null, user);
    }));

    passport.authenticate('saml', {

    })(req, res, (err, data) => {});
}

function ssoCallback(req, res) {
    const opts = {
        callbackUrl: 'http://cobol.chart2.com:1337/api/sso/saml2/acs/demo1',
        entryPoint: 'https://cobolbaby-dev.onelogin.com/trust/saml2/http-post/sso/796983',
        issuer: 'passport-saml',
        cert: `-----BEGIN CERTIFICATE-----
        MIIEHTCCAwWgAwIBAgIUEPGXZz5ErndhS42mvxwy4zsfGAcwDQYJKoZIhvcNAQEF
        BQAwWjELMAkGA1UEBhMCVVMxEjAQBgNVBAoMCWNvYm9sYmFieTEVMBMGA1UECwwM
        T25lTG9naW4gSWRQMSAwHgYDVQQDDBdPbmVMb2dpbiBBY2NvdW50IDEyODM4NjAe
        Fw0xODA2MDUwOTI1NDhaFw0yMzA2MDUwOTI1NDhaMFoxCzAJBgNVBAYTAlVTMRIw
        EAYDVQQKDAljb2JvbGJhYnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UE
        AwwXT25lTG9naW4gQWNjb3VudCAxMjgzODYwggEiMA0GCSqGSIb3DQEBAQUAA4IB
        DwAwggEKAoIBAQC1IeJCRFDUc49xH8NOGqsaRpBxUZRW3T5b5u4bml/VyZ6ZmKE7
        oYH1fOdnfu5jUpW7yvO0xg/V0KMw80d/g1Ghl88aQNaupxOwL6WtC0q0lwXZoHNj
        yNPAE1yRDtQ15lLlO2OKAeiBkPeZYQEORYG+nhibvAIOKfakA76CE82i8tGrRgyo
        3iL64VqH58S+bBFFv0lwscocRqVI8kYaIdx7Go1PIxdgt2K3VmgAZ8M6ugjnuhTw
        0/PRTQ6t0IDfIU2E3myolvLu+Fei+Qk/fwn9FuI2qyewQsnE+9Ge3LuwzWtO5iCi
        E+ZlI5zSvIkqp284cl4M8WhEI3GRPT73dMhZAgMBAAGjgdowgdcwDAYDVR0TAQH/
        BAIwADAdBgNVHQ4EFgQUv9iUizoygX2/Mo10mHqKM5b70uAwgZcGA1UdIwSBjzCB
        jIAUv9iUizoygX2/Mo10mHqKM5b70uChXqRcMFoxCzAJBgNVBAYTAlVTMRIwEAYD
        VQQKDAljb2JvbGJhYnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UEAwwX
        T25lTG9naW4gQWNjb3VudCAxMjgzODaCFBDxl2c+RK53YUuNpr8cMuM7HxgHMA4G
        A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQUFAAOCAQEAhOTNvE8REZ6aoKoX58SF
        LSSLHcDJ0bybz+tY8ccVRRrugNU4SY0gkestnXiYCNi9KQkvKZMbw0vQx5+Y5e+1
        67lGMYFdyCSLUfZot9y6KI3V2r6RpbTpPcu5FfB64BV2JjWx4WsRh18pXyDXdB77
        xFz8YwgyZfcifw1Ecln8xCJlRZpaq/iFMJaYP2kLdJn97M0wm8M0yKe64VSQTKVi
        WLJ5uPDAkvuMnNWR4KIsYMfb5tEpSJWlzcSM1WfGBNtQVKpjyusMeXj0beG+GF9B
        o0CCK33HzIeVVTYNeIkupdNGcPn8ofoS2aOIcHMaDvGShd47wf8OiFv0tgvwtAIG
        7g==`,
        logoutUrl: 'https://cobolbaby-dev.onelogin.com/trust/saml2/http-redirect/slo/796983'
    };

    passport.use(new SamlStrategy(opts, (profile, done) => {
        // 查询用户是否存在，如果存在则返回
        let user = profile;
        return done(null, user);
    }));
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
    })(req, res, req.next);
}

function ssoLogout(req, res) {
    req.logout();
    return res.redirect('/');
}

module.exports = {
    ssoRedirect,
    ssoCallback,
    ssoLogout
};

