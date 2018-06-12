module.exports.serviceapi = {

    userService: {
        checkPermissions   :   "/api/permissions/check",
        getOrgByDomain     :   "/api/organization/search/domain?domain=%s",
        checkEmail         :   "/api/user/email/check",
        loginV2            :   "/api/v2/user/login",
        addMember2Org      :   "/api/organization/%s/members",
    },

    taobao: {
        getIPInfo          :   "http://ip.taobao.com/service/getIpInfo.php?ip=%s"
    }

}