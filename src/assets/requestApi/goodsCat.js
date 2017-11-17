import Vue from 'vue'
import '../js'
//新增类目
Vue.prototype.httpApi.goodsCat.createCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/createCategory', params,
    function (data) {
      successCallback(data);
    })
};
//新增单位
Vue.prototype.httpApi.goodsCat.createUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/createUnit', params,
    function (data) {
      successCallback(data);
    })
};

//删除类目
Vue.prototype.httpApi.goodsCat.deleteCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/deleteCategory', params,
    function (data) {
      successCallback(data);
    })
};
//删除单位
Vue.prototype.httpApi.goodsCat.deleteUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/deleteUnit', params,
    function (data) {
      successCallback(data);
    })
};
//修改类目
Vue.prototype.httpApi.goodsCat.editCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/editCategory', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录
Vue.prototype.httpApi.goodsCat.exportRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/exportRecord', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录列表
Vue.prototype.httpApi.goodsCat.exportRecordList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/exportRecordList', params,
    function (data) {
      successCallback(data);
    })
};
//单位列表
Vue.prototype.httpApi.goodsCat.unitList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/unitList', params,
    function (data) {
      successCallback(data);
    })
};
