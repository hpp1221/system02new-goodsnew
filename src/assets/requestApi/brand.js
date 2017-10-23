import Vue from 'vue'
import '../js'
//新增品牌
Vue.prototype.httpApi.brand.createBrand = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brand/createBrand', params,
    function (data) {
      successCallback(data);
    })
};
//删除商品品牌
Vue.prototype.httpApi.brand.deleteBrandByBrandId = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brand/deleteBrandByBrandId', params,
    function (data) {
      successCallback(data);
    })
};
//品牌列表
Vue.prototype.httpApi.brand.getBrandList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brand/getBrandList', params,
    function (data) {
      successCallback(data);
    })
};
//查询
Vue.prototype.httpApi.brand.searchBrandById = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brand/searchBrandById', params,
    function (data) {
      successCallback(data);
    })
};
//置顶
Vue.prototype.httpApi.brand.setTop = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brand/setTop', params,
    function (data) {
      successCallback(data);
    })
};
//取消置顶
Vue.prototype.httpApi.brand.unSetTop = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brand/unSetTop', params,
    function (data) {
      successCallback(data);
    })
};
//修改品牌
Vue.prototype.httpApi.brand.updateBrandByBrandId = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brand/updateBrandByBrandId', params,
    function (data) {
      successCallback(data);
    })
};
