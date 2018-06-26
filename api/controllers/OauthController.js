"use strict";

const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const model = {
	getAccessToken: function (access_token) {
		let user = {
			email: 'cobolbaby@qq.com'
		};
		let token = {
			access_token: access_token || 'ssssssssss',
			expires_in: 3600000,
			scope: null
		};
		return Promise.resolve({
			accessToken: token.access_token,
			accessTokenExpiresAt: new Date(new Date().getTime() + token.expires_in),
			scope: token.scope,
			client: {
                id: 'demo', // with 'id' property
            },
			user: user
		});
	},
	getAuthorizationCode: async function (authorizationCode) {
        return Promise.resolve('works!');
	},
	getClient: async function (clientId, clientSecret) {
		return Promise.resolve('works!');
	},
	getUser: async function (sername, password) {
		return Promise.resolve('works!');
	}
};
const oauth = new OAuth2Server({
	model: model,
	allowBearerTokensInQueryString: true,
	accessTokenLifetime: 24 * 60 * 60
});

function authorize(req, res) {
    let request = new Request(req);
	let response = new Response(res);
	oauth.authorize(request, response)
		.then((token) => {
			return res.json(token);
		})
		.catch((err) => {
			sails.log.error(`[${err.code}]${err.message}`);
			return res.send(err.code, err.message);
		});
}
exports.authorize = authorize;


function task(req, res) {
	let request = new Request(req);
	let response = new Response(res);
	oauth.authenticate(request, response)
		.then((token) => {
			return res.json(token);
		})
		.catch((err) => {
			sails.log.error(`[${err.code}]${err.message}`);
			return res.send(err.code, err.message);
		});
}
exports.task = task;

function createToken(req, res) {

}
exports.createToken = createToken;
