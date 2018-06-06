/**
 * ProxyController
 *
 * @description :: Server-side logic for managing Proxies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const request = require('request');

function proxy (req, res) {
    sails.log.debug(req.headers);
    let url = 'https://www.baidu.com/' + req.url;
    return req.pipe(request(url)).pipe(res);
}

module.exports = {
    proxy
};

