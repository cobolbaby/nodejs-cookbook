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
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/wechat-enterprise');
        }
        res.view('homepage');
    }
};

