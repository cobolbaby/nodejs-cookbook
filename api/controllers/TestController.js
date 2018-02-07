import * as geoip from "geoip-lite";

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

  showErr: function(req, res) {
    let err = {
      code: 500,
      message: JSON.stringify({
        field1: "abc"
      })
    };

    return res.json(err.code, JSON.parse(err.message));
  },

  /**
   * TODO::change ipv6 => ipv4
   */
  getIp: function(req, res) {
    // return is important
    return res.send(req.ip);
  }

    
};
