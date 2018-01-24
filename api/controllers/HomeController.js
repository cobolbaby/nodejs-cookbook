/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var static_resource_conf = sails.config.staticResource; // 深拷贝还是浅拷贝

function arrSort (arr) {
    arr.sort(function(x, y){
        return new Date(x['trxn_date']) * 1 - new Date(y['trxn_date']) * 1;
    });
    return arr;
}

module.exports = {
	
    /**
    * `HomeController.debug()`
    */
    debug: function (req, res) {

        /*
        console.log('perform subsequent tasks');
        setTimeout(function(){
            console.log('subsequent tasks is finished');
        } ,5000);
        console.log('export the json string');
        res.json({
          todo: 'debug() is not implemented yet!'
        });
        */

        let arr = [
            {
                "order_no": "CRF01905172851828088832",
                "order_type": "p",
                "trxn_date": "2017-09-06",
                "trxn_amt": 400000,
                "terms": 2,
                "loan_days": 0,
                "repay_date": "2017-10-06",
                "status": "3",
                "repay_type": null,
                "credit_type": "",
                "loan_desc": "",
                "consume_desc": null
            },
            {
                "order_no": "905170393861087232",
                "order_type": "r",
                "trxn_date": "2017-09-06",
                "trxn_amt": 416440,
                "terms": 0,
                "loan_days": 0,
                "repay_date": "",
                "status": "4",
                "repay_type": "1",
                "credit_type": null,
                "loan_desc": null,
                "consume_desc": null
            },
            {
                "order_no": "CRF01872277729008824320",
                "order_type": "p",
                "trxn_date": "2017-06-07",
                "trxn_amt": 300000,
                "terms": 1,
                "loan_days": 30,
                "repay_date": "2017-07-07",
                "status": "3",
                "repay_type": null,
                "credit_type": "",
                "loan_desc": "",
                "consume_desc": null
            },
            {
                "order_no": "872276459266641920",
                "order_type": "r",
                "trxn_date": "2017-06-07",
                "trxn_amt": 259355,
                "terms": 0,
                "loan_days": 0,
                "repay_date": "",
                "status": "4",
                "repay_type": "1",
                "credit_type": null,
                "loan_desc": null,
                "consume_desc": null
            },
            {
                "order_no": "CRF01894067030981218304",
                "order_type": "p",
                "trxn_date": "2017-08-06",
                "trxn_amt": 400000,
                "terms": 2,
                "loan_days": 0,
                "repay_date": "2017-10-06",
                "status": "3",
                "repay_type": null,
                "credit_type": "",
                "loan_desc": "",
                "consume_desc": null
            },
            {
                "order_no": "894059333137620992",
                "order_type": "r",
                "trxn_date": "2017-08-06",
                "trxn_amt": 204853,
                "terms": 0,
                "loan_days": 0,
                "repay_date": "",
                "status": "4",
                "repay_type": "1",
                "credit_type": null,
                "loan_desc": null,
                "consume_desc": null
            },
            {
                "order_no": "893388650003337216",
                "order_type": "r",
                "trxn_date": "2017-08-04",
                "trxn_amt": 216086,
                "terms": 0,
                "loan_days": 0,
                "repay_date": "",
                "status": "4",
                "repay_type": "1",
                "credit_type": null,
                "loan_desc": null,
                "consume_desc": null
            },
            {
                "order_no": "CRF01881943400177086464",
                "order_type": "p",
                "trxn_date": "2017-07-04",
                "trxn_amt": 400000,
                "terms": 2,
                "loan_days": 0,
                "repay_date": "2017-09-04",
                "status": "3",
                "repay_type": null,
                "credit_type": "",
                "loan_desc": "",
                "consume_desc": null
            },
            {
                "order_no": "881942299856113664",
                "order_type": "r",
                "trxn_date": "2017-07-04",
                "trxn_amt": 315442,
                "terms": 0,
                "loan_days": 0,
                "repay_date": "",
                "status": "4",
                "repay_type": "1",
                "credit_type": null,
                "loan_desc": null,
                "consume_desc": null
            },
            {
                "order_no": "CRF01868367582658179072",
                "order_type": "p",
                "trxn_date": "2017-05-27",
                "trxn_amt": 250000,
                "terms": 1,
                "loan_days": 30,
                "repay_date": "2017-06-26",
                "status": "3",
                "repay_type": null,
                "credit_type": "",
                "loan_desc": "",
                "consume_desc": null
            }
        ];
        return res.json(arrSort(arr));
    },

    /**
     * TODO::change ipv6 => ipv4
     */
    getIp: function (req, res) {
        // return is important
        return res.send(req.ip);
    },

    index: function (req, res) {
        // 验证SessionID
        // sails.log.debug('sessionID is:' + req.sessionID);
        
        sails.log.debug('static_resource_conf domain is:' + static_resource_conf.domain); // 用于验证全局变量是否被篡改了
        static_resource_conf.domain = "http://cobolbaby.com";
        sails.log.debug("static_resource_conf domain is:" + static_resource_conf.domain);
        sails.log.debug('sails.config.staticResource is:' + sails.config.staticResource.domain); // 用于验证是否为深拷贝还是欠拷贝

        res.view('homepage');
    },

    testAcl: function (req, res) {

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

        Acl.check(user, function(isCheck){
            if (isCheck) {
                return res.ok('get permission');
            } else {
                return res.forbidden();
            }
        });
    },


};

