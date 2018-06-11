module.exports.serviceapi = {

    userService: {
        checkPermissions   :   "/api/permissions/check",
        getOrgByDomain     :   "/api/organization/search/domain?domain=%s",
        checkEmail         :   "/api/user/email/check",
        checkUserStatus    :   "/api/user/status",
        login              :   "/api/v2/user/login",
    },

    taobao: {
        getIPInfo          :   "http://ip.taobao.com/service/getIpInfo.php?ip=%s"
    }

}