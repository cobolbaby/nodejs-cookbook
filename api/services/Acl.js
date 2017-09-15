/**
 * wechat enterprise utility function
 */

var util = require('util');
var request = require('request');

/*
{
   "errcode": 0,
   "errmsg": "ok",
   "tagname": "乒乓球协会",
   "userlist": [
         {
             "userid": "zhangsan",
             "name": "李四"
         }
     ],
   "partylist": [2]
}
*/
function getUserTag(access_token, tagid, cb) {

    let _getUserTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/tag/get?access_token=%s&tagid=%d';
    let url = util.format(_getUserTagUrl, access_token, tagid);
    request(url, function(error, response, body) {
        if (error) {
            return cb(error);
        }
        let res = JSON.parse(body);
        if (res.errcode) { // exception handler
            return cb(res.errmsg);    
        }
        return cb(null, body);
    });
}

/*
{
   "errcode":0，
   "errmsg":""，
   "access_token": "accesstoken000001",
   "expires_in": 7200
}
*/
function getAccessToken(cb) {

    let _getAccessTokenUrl = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s';
    let options = sails.config.passport['wechat-enterprise'].options;
    let url = util.format(_getAccessTokenUrl, options.corpId, options.corpSecret);
    request(url, function(error, response, body) {
        if (error) {
            return cb(error);
        }
        let res = JSON.parse(body);
        if (res.errcode) { // exception handler
            return cb(res.errmsg);    
        }
        return cb(null, body);
    });
}

module.exports = {

    check: function(uinfo, cb) {

        // cb(true);

        getAccessToken(function(err, res) {
            if (err) {
                sails.log.error(err);
                return cb(false);
            }
            sails.log.debug(res);
            const tagid = 1; // audit tag
            let token = JSON.parse(res);
            return getUserTag(token.access_token, tagid, function(err, res) {
                if (err) {
                    sails.log.error(err);
                    return cb(false);
                }
                sails.log.debug(res);
                let taginfo = JSON.parse(res);
                _.each(taginfo.userlist, function(user) {
                    if (user.userid === uinfo.UserId) {
                        return cb(true);
                    }
                });
                return cb(false);
            });
        });
    }

};