import Vue from 'vue'
import '../js'
//品牌新增
Vue.prototype.httpApi.brands.addBrand = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand-v1/addBrand', params,
    function (data) {
      successCallback(data);
    })
};
//品牌列表不分页
Vue.prototype.httpApi.brands.selectBrandAllList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand-v1/selectBrandAllList', params,
    function (data) {
      successCallback(data);
    })
};

//根据id查询品牌详情
Vue.prototype.httpApi.brands.selectBrandById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/brand-v1/selectBrandById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询品牌列表
Vue.prototype.httpApi.brands.selectBrandList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand-v1/selectBrandList', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改品牌信息
Vue.prototype.httpApi.brands.updateBrandById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand-v1/updateBrandById', params,
    function (data) {
      successCallback(data);
    })
};

//根据id修改品牌状态
Vue.prototype.httpApi.brands.updateBrandStatusById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brand-v1/updateBrandStatusById', params,
    function (data) {
      successCallback(data);
    })
};


