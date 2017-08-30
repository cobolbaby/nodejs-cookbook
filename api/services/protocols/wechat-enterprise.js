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

module.exports = function(req, profile, next) {
    var query = {
        identifier: profile.UserId,
        protocol: 'wechat',
        tokens: {}
    };

    // wechat does not have username or email filed needed by passport.connect()
    profile.username = profile.username || profile.UserId;

    passport.connect(req, query, profile, next);
};