/**
 * ProxyController
 *
 * @description :: Server-side logic for managing Proxies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const request = require('request'),
	ms = require('ms');

function proxy(req, res) {
	let opts = {
		method: req.method,
		url: req.url,
		headers: req.headers,
        timeout: ms('60s'),
        followRedirect: false
    };
    // 如何处理请求体Body
    
	return req.pipe(request(opts)).on('error', function (err) {
		if (err) {
			sails.log.error(`[${req.url}]`, err);
		}
	}).pipe(res);
}

function test(req, res) {
	const r = request.defaults({
		'proxy': sails.config.proxyServer
	});
	r.get('https://www.google.com/search?q=shujuguan').pipe(res);
}

module.exports = {
	proxy,
	test
};
