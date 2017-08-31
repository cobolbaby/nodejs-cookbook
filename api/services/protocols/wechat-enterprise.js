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
    if (profile.errcode) { // 400
        verified(profile);
    }

    // 二次校验profile...
    // 判断是否有某权限
    if (!Acl.check()) {
        verified(null, null, {'errmsg':''});
    }

    // 改写profile
    let user = _.pick(object, ['UserId', 'DeviceId', 'id']);

    verified(null, user);

};