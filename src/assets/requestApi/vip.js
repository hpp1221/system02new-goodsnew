import Vue from 'vue'
import '../js'
//客户列表
Vue.prototype.httpApi.vip.selectStoreMemberList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/sysMember/selectStoreMemberList', params,
    function (data) {
      successCallback(data);
    })
};
//客户详情
Vue.prototype.httpApi.vip.selectStoreMemberInfoById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/sysMember/selectStoreMemberInfoById', params,
    function (data) {
      successCallback(data);
    })
};
//客户修改
Vue.prototype.httpApi.vip.updateStoreMemberById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/sysMember/updateStoreMemberById', params,
    function (data) {
      successCallback(data);
    })
};
//客户审核
Vue.prototype.httpApi.vip.doAuthentication = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/sysMember/doAuthentication', params,
    function (data) {
      successCallback(data);
    })
};

