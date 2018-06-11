module.exports.serviceapi = {

    userService: {
        checkPermissions   :   "/api/permissions/check",
        getOrgByDomain     :   "/api/organization/search/domain?domain=%s",
    },

    taobao: {
        getIPInfo          :   "http://ip.taobao.com/service/getIpInfo.php?ip=%s"
    }

}