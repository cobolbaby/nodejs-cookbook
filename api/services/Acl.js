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
    let url = util.format(_userGetUrl, access_token, tagid);
    request(url, function(error, response, body) {
        if (error) {
            return cb(error);
        }
        if (body.errcode) {
            return cb(body);    
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
            cb(error);
        }
        if (body.errcode) {
            return cb(body);    
        }
        return cb(null, body);
    });
}

module.exports = {

    check: function(username) {

        return true;

        getAccessToken(function(err, resp) {
            if (err) {
                sails.log.error(err);
                return false;
            }
            const tagid = 1;
            getWeixinContract(resp.access_token, tagid, function(err, resp) {
                if (err) {
                    sails.log.error(err);
                    return false;
                }
                /*
                    "userlist": [
                                    {
                                        "userid": "zhangsan",
                                        "name": "李四"
                                    }
                                ],
                */
                _.each(resp.userlist, function(user) {
                    if (user.userid === username) {
                        return true;
                    }
                });
                return false;
            })
        })


    }

};