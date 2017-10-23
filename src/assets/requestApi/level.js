import Vue from 'vue'
import '../js'
//客户级别列表
Vue.prototype.httpApi.level.getCustomerLevelList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/customerLevel/getCustomerLevelList', params,
    function (data) {
      successCallback(data);
    })
};
//新建客户级别
Vue.prototype.httpApi.level.insertCustomerLevel = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/customerLevel/insertCustomerLevel', params,
    function (data) {
      successCallback(data);
    })
};
//置顶客户级别
Vue.prototype.httpApi.level.setTopCustomerLevel = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/customerLevel/setTopCustomerLevel', params,
    function (data) {
      successCallback(data);
    })
};
//取消客户级别置顶
Vue.prototype.httpApi.level.unSetTopCustomerLevel = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/customerLevel/unSetTopCustomerLevel', params,
    function (data) {
      successCallback(data);
    })
};
//修改客户级别
Vue.prototype.httpApi.level.updateCustomerLevelById = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/customerLevel/updateCustomerLevelById', params,
    function (data) {
      successCallback(data);
    })
};
