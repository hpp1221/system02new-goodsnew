import Vue from 'vue'
import '../js'
//添加标签
Vue.prototype.httpApi.goodsCat.addTag = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/addTag', params,
    function (data) {
      successCallback(data);
    })
};
//新增类目
Vue.prototype.httpApi.goodsCat.createCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/createCategory', params,
    function (data) {
      successCallback(data);
    })
};
//新增单位
Vue.prototype.httpApi.goodsCat.createUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/createUnit', params,
    function (data) {
      successCallback(data);
    })
};

//删除类目
Vue.prototype.httpApi.goodsCat.deleteCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/deleteCategory', params,
    function (data) {
      successCallback(data);
    })
};
//删除单位
Vue.prototype.httpApi.goodsCat.deleteUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/deleteUnit', params,
    function (data) {
      successCallback(data);
    })
};
//修改类目
Vue.prototype.httpApi.goodsCat.editCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/editCategory', params,
    function (data) {
      successCallback(data);
    })
};
//修改标签
Vue.prototype.httpApi.goodsCat.editTag = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/editTag', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录
Vue.prototype.httpApi.goodsCat.exportRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/exportRecord', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录列表
Vue.prototype.httpApi.goodsCat.exportRecordList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/exportRecordList', params,
    function (data) {
      successCallback(data);
    })
};
//单位列表
Vue.prototype.httpApi.goodsCat.unitList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/unitList', params,
    function (data) {
      successCallback(data);
    })
};
