import Vue from 'vue'
import '../js'

//添加权限
Vue.prototype.httpApi.permission.addPermission = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/permission/addPermission', params,
    function (data) {
      successCallback(data);
    })
};
//删除权限
Vue.prototype.httpApi.permission.deletePermission = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/permission/deletePermission', params,
    function (data) {
      successCallback(data);
    })
};
//根据权限id查询权限信息
Vue.prototype.httpApi.permission.selectPermissionById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/permission/selectPermissionById', params,
    function (data) {
      successCallback(data);
    })
};
//权限列表查询
Vue.prototype.httpApi.permission.selectPermissionList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/permission/selectPermissionList', params,
    function (data) {
      successCallback(data);
    })
};
//权限列表查询(租户账号)
Vue.prototype.httpApi.permission.selectPermissionListByCompanyId = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/permission/selectPermissionListByCompanyId', params,
    function (data) {
      successCallback(data);
    })
};
//修改权限
Vue.prototype.httpApi.permission.updatePermission = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/permission/updatePermission', params,
    function (data) {
      successCallback(data);
    })
};
//修改权限状态
Vue.prototype.httpApi.permission.updatePermissionStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/permission/updatePermissionStatus', params,
    function (data) {
      successCallback(data);
    })
};
