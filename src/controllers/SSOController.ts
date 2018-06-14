/**
 * SSOController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

import { Strategy as SamlStrategy } from 'passport-saml';
import * as _ from 'lodash';

import * as sails from 'sails';
import * as passport from '../services/passport';
import * as UserService from '../services/UserService';

function loadSamlStrategy(strategyName, opts) {
	// 考虑到用户可能修改配置，此处需要动态加载
	passport.use(new SamlStrategy(opts, (profile, done) => {
		// 查询用户是否存在，如果存在则返回
		let user = profile;
		return done(null, user);
	}));
	return passport._strategy(strategyName);
}

export async function ssoRedirect(req, res) {
	try {
		var orgInfo = await UserService.getOrgByDomain(req);
	} catch (error) {
		return res.forbidden(error);
	}
	if (!orgInfo || orgInfo.default) {
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
	passport.authenticate(strategyName, {})(req, res, (err, data) => {});
}

export function ssoCallback(req, res) {
	let strategyName = req.param('id').trim().toLowerCase();
	// 获取当前企业ID
	let currentOid = Number(strategyName.split('-')[1]);
	// 根据strategyName获取企业ID
	passport.authenticate(strategyName, {}, async (err, profile, info) => {
		if (err) {
			return res.forbidden(err);
		}
		if (!profile) {
			return res.forbidden(info);
		}
		sails.log.info(profile);
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
		try {
			var uinfo = await UserService.checkUser(req, {email: profile.nameID});
		} catch (err) {
			return res.forbidden(err);
		}
		
		// 判断登录用户是否在该企业中
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
			// return res.forbidden(new Error('The user do not exists'));
			// 强行邀请
			uinfo = await UserService.addMember2Org(req, {
				email: profile.nameID,
				oid: currentOid
			});
		}

		// 登录
		try {
			var user = await UserService.loginV2(req, {
				uid: uinfo.uid,
				oid: currentOid
			});
			/*
			"uid": "1000101",
			"last_login_time": 1528785383,
			"login_num": 4,
			"username": "cobolbaby@qq.com",
			"plan_id": 2,
			"oid": "12",
			"nickname": "cobolbaby",
			"avatar": "/Uploads/Avatar/201806/5b1f4d8e3f87c.jpg",
			"mobile": "",
			"scene": "sso"
			*/
		} catch (err) {
			return res.serverError(err);
		}

		// 要想退出，`req.user`中需要包含`nameID`，`nameIDFormat`以及`sessionIndex`
		// 所以还得附加属性
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

export async function LogoutRedirect(req, res) {
	let orgInfo = {};
	try {
		orgInfo = await UserService.getOrgByDomain(req);
	} catch (error) {
		return res.forbidden(error);
	}
	if (!orgInfo || orgInfo.default) {
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
		// LOCAL logout
		req.logout();
		// delete req.session.authenticated;
		// redirect to the IdP with the encrypted SAML logout request
		return res.redirect(requestUrl);
	});
}

export async function generateSPMetadata(req, res) {
	let orgInfo = {};
	try {
		orgInfo = await UserService.getOrgByDomain(req);
	} catch (error) {
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

function LogoutCallback(req, res) {
	// LOCAL logout
	req.logout();
	// delete req.session.authenticated;
	return res.redirect(sails.config.entry.login);
}
