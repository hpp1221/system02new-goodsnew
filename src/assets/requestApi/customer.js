import Vue from 'vue'
import '../js'
//根据id删除客户信息
Vue.prototype.httpApi.customer.deleteCustomerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/customer/deleteCustomerById', params,
    function (data) {
      successCallback(data);
    })
};
//添加客户信息
Vue.prototype.httpApi.customer.addStoreMember = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/sysMember/addStoreMember', params,
    function (data) {
      successCallback(data);
    })
};
//根据id客户信息
Vue.prototype.httpApi.customer.selectCustomerById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/customer/selectCustomerById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询客户信息列表
Vue.prototype.httpApi.customer.selectCustomerListPage = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/customer/selectCustomerListPage', params,
    function (data) {
      successCallback(data);
    })
};
//更新客户信息
Vue.prototype.httpApi.customer.updateCustomerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/customer/updateCustomerById', params,
    function (data) {
      successCallback(data);
    })
};
//更新客户信息
Vue.prototype.httpApi.customer.selectMemberListByIds = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/sysMember/selectMemberListByIds', params,
    function (data) {
      successCallback(data);
    })
};
