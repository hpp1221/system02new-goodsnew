import Vue from 'vue'
import '../js'
//临时商品删除
Vue.prototype.httpApi.temporary.deleteFalseGoodsById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/fgoods/deleteFalseGoodsById', params,
    function (data) {
      successCallback(data);
    })
};
//临时商品新增
Vue.prototype.httpApi.temporary.insertFalseGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/fgoods/insertFalseGoods', params,
    function (data) {
      successCallback(data);
    })
};
//临时商品根据id查询单个临时数据
Vue.prototype.httpApi.temporary.selectFalseGoodsById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/fgoods/selectFalseGoodsById', params,
    function (data) {
      successCallback(data);
    })
};
//临时商品列表
Vue.prototype.httpApi.temporary.selectFalseGoodsList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/fgoods/selectFalseGoodsList', params,
    function (data) {
      successCallback(data);
    })
};
//临时商品修改
Vue.prototype.httpApi.temporary.updateFalseGoodsById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/fgoods/updateFalseGoodsById', params,
    function (data) {
      successCallback(data);
    })
};
//临时商品类目树
Vue.prototype.httpApi.temporary.getGoodsCatTree = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goodsCat/getGoodsCatTree', params,
    function (data) {
      successCallback(data);
    })
};
