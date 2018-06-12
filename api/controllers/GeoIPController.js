const geoip = require('geoip-lite');
const requestIp = require('request-ip');

module.exports = {
  getAddress: function(req, res) {
    let ips = req.body.ips || [];
    if (ips.length === 0) {
      return res.badRequest();
    }
    // 循环查询

    // 验证IP

    // 支持长整型

    
    return res.send(geoip.lookup(ips[0]));
  },

  /**
   * TODO::change ipv6 => ipv4
   */
  getIp: function(req, res) {
    // return is important
    let ip = requestIp.getClientIp(req);
    return res.send(ip);
  }

    
};
