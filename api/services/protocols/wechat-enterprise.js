/**
 * passport-wechat-enterprise OAuth 2.0 Authentication Protocol
 *
OAuth2返回后的verify回调函数

@param done callback function
 */

module.exports = function(req, profile, verified) {
    
    /*
    { 
        UserId: 'zhangxinglong@gbase.cn',
        DeviceId: '0c2b2cc8e2093ec4ee7e9fde0509b480',
        errcode: 0,
        errmsg: 'ok',
        id: 'zhangxinglong@gbase.cn'
    }
    */
    sails.log.debug(profile);
    if (profile.errcode) { // 400
        return verified(profile.errmsg);
    }

    Acl.check(profile, function(isCheck) {
        sails.log.debug(isCheck);
        if (!isCheck) {
            return verified(null, null, {'errmsg':'xxxx'});
        }
        // 改写profile
        let user = _.pick(profile, ['UserId', 'DeviceId', 'id']);
        return verified(null, user);
    });

};