const util = require('util');
const RestClient = require('../helpers/RestClient');
const apiPath = sails.config.serviceapi;
const apiBasePath = sails.config.services.USER_SERVICE_URI;

/**
 * 通过独立子域名查询企业详情，判断企业账户状态以及SSO相关配置
 * @param {string} subdomain 
 */
async function getOrgByDomain(req) {

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
    const domain = req.protocol + '://' + req.host + ':' + req.port;
	try {
        let opts = {
            url: apiBasePath + util.format(apiPath.userService.getOrgByDomain, domain),
        };
        let res = await RestClient.reqRest(opts, req);
        return res.body.data;
    } catch (err) {
        sails.log.error(err);
        throw err;
    }
}
exports.getOrgByDomain = getOrgByDomain;

/**
 * 
 * @param {*} req 
 * @param {*} user 
 */
async function checkUser(req, user) {
	try {
		let opts = {
			url: apiBasePath + apiPath.userService.checkEmail,
			method: 'POST',
			body: {
				account: user.email
			}
		};
		let res = await RestClient.reqRest(opts, req);
		return res.body.data;
	} catch (err) {
		sails.log.error(err);
		throw err;
	}
}
exports.checkUser = checkUser;

/**
 * 
 * @param {*} req 
 * @param {*} user 
 */
async function loginV2(req, user) {
	try {
		let opts = {
			url: apiBasePath + apiPath.userService.loginV2,
			method: 'POST',
			body: {
				uid: user.uid,
				oid: user.oid,
				scene: 'sso'
			}
		};
		let res = await RestClient.reqRest(opts, req);
		return res.body.data;
	} catch (err) {
		sails.log.error(err);
		throw err;
	}
}
exports.loginV2 = loginV2;
