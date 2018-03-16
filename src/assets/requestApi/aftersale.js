import Vue from 'vue'
import '../js'
//售后列表
Vue.prototype.httpApi.aftersale.selectOrderAftersalesBySearchWord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/selectOrderAftersalesBySearchWord', params,
    function (data) {
      successCallback(data);
    })
};
//每个售后详情
Vue.prototype.httpApi.aftersale.selectOrderAftersalesById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/selectOrderAftersalesById', params,
    function (data) {
      successCallback(data);
    })
};
//售后修改
Vue.prototype.httpApi.aftersale.updateOrderAftersalesStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/updateOrderAftersalesStatus', params,
    function (data) {
      successCallback(data);
    })
};




