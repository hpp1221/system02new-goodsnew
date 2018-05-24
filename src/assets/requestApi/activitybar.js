import Vue from 'vue'
import '../js'
//活动栏新增
Vue.prototype.httpApi.activitybar.addBanner = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/banner/addBanner', params,
    function (data) {
      successCallback(data);
    })
};
//删除活动栏
Vue.prototype.httpApi.activitybar.deleteBannerById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/banner/deleteBannerById', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询活动栏详情
Vue.prototype.httpApi.activitybar.selectBannerById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/banner/selectBannerById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询列表
Vue.prototype.httpApi.activitybar.selectBannerList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/banner/selectBannerList', params,
    function (data) {
      successCallback(data);
    })
};
//活动栏修改
Vue.prototype.httpApi.activitybar.updateBannerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/banner/updateBannerById', params,
    function (data) {
      successCallback(data);
    })
};
