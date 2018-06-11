/**
 * SSOController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const SamlStrategy = require('passport-saml').Strategy;
// const passport = require('../services/passport');

function loadSamlStrategy(strategyName, opts) {
	const samlStrategy = passport._strategy(strategyName);
	if (samlStrategy) {
		return samlStrategy;
	}
	passport.use(new SamlStrategy(opts, (profile, done) => {
		// 查询用户是否存在，如果存在则返回
		let user = profile;
		return done(null, user);
	}));
	return passport._strategy(strategyName);
}

async function ssoRedirect(req, res) {
	try {
		orgInfo = await UserService.getOrgByDomain(req);
	} catch (error) {
		return res.forbidden(error);
	}
	if (orgInfo.default) {
		// 显示正常登录页面
		return res.view('login');
	}
	if (orgInfo.status != 1) {
		return res.forbidden(new Error('The Org is forbidden'));
	}
	if (!orgInfo.sso) {
		// 显示正常登录页面
		return res.view('login');
	}
	const strategyName = `samlstrategy${orgInfo.idp.id}`;
	const opts = {
		issuer: orgInfo.idp.issuer,
		entryPoint: orgInfo.idp.entrypoint,
		callbackUrl: orgInfo.domain + orgInfo.idp.acs,
		cert: orgInfo.idp.x509cert,
		logoutUrl: orgInfo.idp.slo,
		name: strategyName,
	};
	const samlStrategy = loadSamlStrategy(strategyName, opts);
	passport.authenticate(strategyName, {})(req, res, (err, data) => {});
}

function ssoCallback(req, res) {
	const strategyName = req.param('id').trim().toLowerCase();
	passport.authenticate(strategyName, {}, (err, profile, info) => {
		if (err) {
			return res.forbidden(err);
		}
		if (!profile) {
			return res.forbidden(info);
		}
		// 校验user是否存在

		let user = profile;
		sails.log.info(user);
		/**
  issuer: 'https://app.onelogin.com/saml/metadata/796983',
  sessionIndex: '_b0009960-4b8d-0136-3355-06210aa143d4',
  nameID: 'cobolbaby@qq.com',
  nameIDFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
  nameQualifier: undefined,
  spNameQualifier: undefined,
  'User.LastName': 'Xinglong',
  'User.FirstName': 'Zhang',
  memberOf: undefined,
  PersonImmutableID: undefined,
  'User.email': 'cobolbaby@qq.com',
         */

		// 如果存在则使用
		// req.session.authenticated = true;
		req.login(user, (err) => {
			if (err) {
				return res.forbidden(err);
			}
			return res.redirect('/');
		});
	})(req, res, req.next);
}

async function LogoutRedirect(req, res) {
	let orgInfo = {};
	try {
		orgInfo = await UserService.getOrgByDomain(req);
	} catch (error) {
		return res.forbidden(error);
	}
	if (orgInfo.default) {
		// 显示正常登录页面
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

	const strategyName = `samlstrategy${orgInfo.idp.id}`;
	const opts = {
		issuer: orgInfo.idp.issuer,
		entryPoint: orgInfo.idp.entrypoint,
		callbackUrl: orgInfo.domain + orgInfo.idp.acs,
		cert: orgInfo.idp.x509cert,
		logoutUrl: orgInfo.idp.slo,
		name: strategyName,
	};
	const samlStrategy = loadSamlStrategy(strategyName, opts);
	samlStrategy.logout(req, function (err, requestUrl) {
		// LOCAL logout
		req.logout();
		// delete req.session.authenticated;
		// redirect to the IdP with the encrypted SAML logout request
		return res.redirect(requestUrl);
	});
}

function LogoutCallback(req, res) {
	// LOCAL logout
	req.logout();
	// delete req.session.authenticated;
	return res.redirect(sails.config.entry.login);
}

module.exports = {
	ssoRedirect,
	ssoCallback,
	LogoutRedirect,
	// LogoutCallback
};
