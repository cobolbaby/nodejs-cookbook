/**
 * passport-wechat-enterprise OAuth 2.0 Authentication Protocol
 *
OAuth2返回后的verify回调函数

@param profile Object of {
    DeviceId: "bb4bcec5070333f9e5fe88cf88939f3f"
    UserId: "PEI"
    id: "PEI"
}

@param done callback function
 */

module.exports = function(req, profile, verified) {
    
    // 二次校验profile...

    // 改写profile

    verified(null, profile);

};