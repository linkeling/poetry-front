let ApiUtils = {
    getUserLoginInfo: function () {
        return JSON.parse(sessionStorage.getItem("userLoginInfo"));
    },
}
export const apiUtils = ApiUtils;