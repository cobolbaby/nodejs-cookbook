/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * Create a third-party authentication endpoint
     *
     * @param {Object} req
     * @param {Object} res
     */
    provider: function(req, res) {
        passport.endpoint(req, res);
    },

    /**
     * Create a authentication callback endpoint
     *
     * This endpoint handles everything related to creating and verifying Pass-
     * ports and users, both locally and from third-aprty providers.
     *
     * Passport exposes a login() function on req (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation
     * completes, user will be assigned to req.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     *
     * @param {Object} req
     * @param {Object} res
     */
    callback: function(req, res) {

        passport.callback(req, res, function(err, user, info) {
            if (err) {
                sails.log.error('Fail to pass the passport verification:' + err);
                return res.forbidden('Fail to pass the passport verification');
            }
            sails.log.info('authoricate user:', user);
            if (!user) {
                sails.log.error(info);
                return res.forbidden(info);
            }
            /*
            {
                UserId: 'zhangxinglong@gbase.cn',
                DeviceId: '0c2b2cc8e2093ec4ee7e9fde0509b480',
                id: 'zhangxinglong@gbase.cn'
            }
            */
            req.login(user, function(err) {
                if (err) {
                    sails.log.error('req.login err:', err);
                    return res.forbidden('req.login err');
                }

                // Upon successful login, send the user to the homepage were req.user
                // will be available.
                // req.session.authenticated　=　true;
                sails.log.info('success to authoricate');
                return res.redirect('/');
            });
        });
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