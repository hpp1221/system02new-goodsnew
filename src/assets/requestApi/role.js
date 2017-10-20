import Vue from 'vue'
import '../js'

//添加角色
Vue.prototype.httpApi.role.addRole = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/role/addRole', params,
    function (data) {
      successCallback(data);
    })
};



//删除角色
Vue.prototype.httpApi.role.deleteRole = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/role/deleteRole', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询角色
Vue.prototype.httpApi.role.selectRoleInfoById = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/role/selectRoleInfoById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询角色列表
Vue.prototype.httpApi.role.selectRoleList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/role/selectRoleList', params,
    function (data) {
      successCallback(data);
    })
};
//分页条件查询角色列表
Vue.prototype.httpApi.role.selectRoleListPage = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/role/selectRoleListPage', params,
    function (data) {
      successCallback(data);
    })
};
//更新角色
Vue.prototype.httpApi.role.updateRole = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/role/updateRole', params,
    function (data) {
      successCallback(data);
    })
};
