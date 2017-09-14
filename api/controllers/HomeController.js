/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

function fun1 () {
    console.log('custom function');
}

module.exports = {
	
    /**
    * `HomeController.debug()`
    */
    debug: function (req, res) {

        // return res.serverError();

        // fun1();
        console.log('export the json string');
        res.json({
          todo: 'debug() is not implemented yet!'
        });
        console.log('perform subsequent tasks');
        setTimeout(function(){
            console.log('subsequent tasks is finished');
        } ,5000);
    },

    /**
     * TODO::change ipv6 => ipv4
     */
    getIp: function (req, res) {
        // return is important
        return res.send(req.ip);
    },

    index: function (req, res) {
        res.view('homepage');
    },

    httptest: function (req, res) {

    /*
    { 
        UserId: 'zhangxinglong@gbase.cn',
        DeviceId: '0c2b2cc8e2093ec4ee7e9fde0509b480',
        errcode: 0,
        errmsg: 'ok',
        id: 'zhangxinglong@gbase.cn'
    }
    */
        let user = { 
            UserId: 'zhangxinglong@gbase.cn',
            DeviceId: '0c2b2cc8e2093ec4ee7e9fde0509b480',
            errcode: 0,
            errmsg: 'ok',
            id: 'zhangxinglong@gbase.cn'
        };

        Acl.check(user.UserId);
    }
};

