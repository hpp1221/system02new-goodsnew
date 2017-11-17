import Vue from 'vue'
import '../js'
//添加部门
Vue.prototype.httpApi.organization.addOrganization = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/organization/addOrganization', params,
    function (data) {
      successCallback(data);
    })
};
//添加部门
Vue.prototype.httpApi.organization.deleteOrganizationById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/organization/deleteOrganizationById', params,
    function (data) {
      successCallback(data);
    })
};
//查询部门详情
Vue.prototype.httpApi.organization.selectOrganizationById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/organization/selectOrganizationById', params,
    function (data) {
      successCallback(data);
    })
};
//查询公司详情
Vue.prototype.httpApi.organization.selectOrganizationList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/organization/selectOrganizationList', params,
    function (data) {
      successCallback(data);
    })
};
//查询部门
Vue.prototype.httpApi.organization.selectOrganizationListByCompanyId = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/organization/selectOrganizationListByCompanyId', params,
    function (data) {
      successCallback(data);
    })
};

//添加部门
Vue.prototype.httpApi.organization.updateOrganization = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/organization/updateOrganization', params,
    function (data) {
      successCallback(data);
    })
};

