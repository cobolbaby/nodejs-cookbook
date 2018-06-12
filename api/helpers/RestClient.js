const _ = require('lodash');
const request = require('request');

/**
 * 
 * @param {*} req       给后端的请求
 * @param {*} originReq 前端推送的请求 
 * @param {*} cb        回调函数 
 */
function reqRest(req, originReq) {
    if (_.isEmpty(req.url)) {
        return Promise.reject(new Error('req.url not exists'));
        // 下面的方法同样可以抛出异常
        // throw new Error('req.url not exists');
	}

	let headers = {
		'Accept-Language': originReq.langset || 'zh-CN',
		'X-FORWARDED-FOR': originReq.ip || '',
		'SESSID': originReq.sessionID || ''
	};
	let opts = {
		url: req.url,
		method: req.method || 'GET',
		headers: _.extend(headers, req.header || {}),
		json: true // Automatically stringifies the body to JSON
	};
	if (req.body) {
		opts.body = req.body;
	}

	return new Promise(function (resolve, reject) {
	    request(opts, function (error, response, body) {
	        if (error) return reject(error);
	        resolve(response);
	    })
	});
}
exports.reqRest = reqRest;

/**
 * 
 * @param {*} req       给后端的请求
 * @param {*} originReq 前端推送的请求 
 * @param {*} cb        回调函数 
 */
function reqRestAuth(req, originReq) {
	if (_.isEmpty(req.url)) {
        return Promise.reject(new Error('req.url not exists'));
	}

	let headers = {
		'Accept-Language': originReq.langset || 'zh-CN',
		'X-FORWARDED-FOR': originReq.ip || '',
		'SESSID': originReq.sessionID || '',
		oid: originReq.user.oid,
		uid: originReq.user.uid
	};
	let opts = {
		url: req.url,
		method: req.method || 'GET',
		headers: _.extend(headers, req.header || {}),
		json: true // Automatically stringifies the body to JSON
	};
	if (req.body) {
		opts.body = req.body;n
	}
    return new Promise(function (resolve, reject) {
	    request(opts, function (error, response, body) {
	        if (error) return reject(error);
	        resolve(response);
	    })
	});
}
exports.reqRestAuth = reqRestAuth;
