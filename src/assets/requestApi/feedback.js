import Vue from 'vue'
import '../js'
//反馈列表
Vue.prototype.httpApi.feedback.getSug = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/suggest/getSug', params,
    function (data) {
      successCallback(data);
    })
};
//反馈详情
Vue.prototype.httpApi.feedback.moSug = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/suggest/moSug', params,
    function (data) {
      successCallback(data);
    })
};
//反馈处理
Vue.prototype.httpApi.feedback.upSug = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/suggest/upSug', params,
    function (data) {
      successCallback(data);
    })
};
