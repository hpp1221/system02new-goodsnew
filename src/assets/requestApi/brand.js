import Vue from 'vue'
import '../js'

//品牌列表
Vue.prototype.httpApi.brand.selectBrandList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand/selectBrandList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌新增
Vue.prototype.httpApi.brand.addBrand = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand/addBrand', params,
    function (data) {
      successCallback(data);
    })
};
//品牌列表不分页
Vue.prototype.httpApi.brand.selectBrandDealerAllList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerAllList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌列表
Vue.prototype.httpApi.brand.recordListBySku = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌详情
Vue.prototype.httpApi.brand.selectBrandById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/brand/selectBrandById', params,
    function (data) {
      successCallback(data);
    })
};
//品牌修改
Vue.prototype.httpApi.brand.updateBrandById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand/updateBrandById', params,
    function (data) {
      successCallback(data);
    })
};
//品牌删除
Vue.prototype.httpApi.brand.deleteBrandDealerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/deleteBrandDealerById', params,
    function (data) {
      successCallback(data);
    })
};





