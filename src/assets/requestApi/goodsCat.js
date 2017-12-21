import Vue from 'vue'
import '../js'
//新增类目
Vue.prototype.httpApi.goodsCat.createCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/createCategory', params,
    function (data) {
      successCallback(data);
    })
};
//新增单位
Vue.prototype.httpApi.goodsCat.createUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/createUnit', params,
    function (data) {
      successCallback(data);
    })
};

//删除类目
Vue.prototype.httpApi.goodsCat.deleteCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/deleteCategory', params,
    function (data) {
      successCallback(data);
    })
};
//删除单位
Vue.prototype.httpApi.goodsCat.deleteUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/deleteUnit', params,
    function (data) {
      successCallback(data);
    })
};
//修改类目
Vue.prototype.httpApi.goodsCat.editCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/editCategory', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录
Vue.prototype.httpApi.goodsCat.exportRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/exportRecord', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录列表
Vue.prototype.httpApi.goodsCat.exportRecordList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/exportRecordList', params,
    function (data) {
      successCallback(data);
    })
};
//单位列表
Vue.prototype.httpApi.goodsCat.unitList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/unitList', params,
    function (data) {
      successCallback(data);
    })
};
//为你推荐新增
Vue.prototype.httpApi.goodsCat.addRecommendedForYouGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/addRecommendedForYouGoods', params,
    function (data) {
      successCallback(data);
    })
};
//为你推荐列表
Vue.prototype.httpApi.goodsCat.recommendedForYou = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/recommendedForYou', params,
    function (data) {
      successCallback(data);
    })
};
