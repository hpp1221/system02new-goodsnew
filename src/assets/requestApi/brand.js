import Vue from 'vue'
import '../js'
//品牌商列表
Vue.prototype.httpApi.brand.recordListBySku = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商新增
Vue.prototype.httpApi.brand.addBrandDealer = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/addBrandDealer', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商列表不分页
Vue.prototype.httpApi.brand.selectBrandDealerAllList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerAllList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商列表
Vue.prototype.httpApi.brand.recordListBySku = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商详情
Vue.prototype.httpApi.brand.selectBrandDealerById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/brandDealer/selectBrandDealerById', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商修改
Vue.prototype.httpApi.brand.updateBrandDealerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/updateBrandDealerById', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商删除
Vue.prototype.httpApi.brand.deleteBrandDealerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/deleteBrandDealerById', params,
    function (data) {
      successCallback(data);
    })
};




