import Vue from 'vue'
import '../js'
//品牌列表
Vue.prototype.httpApi.brand.brandList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/brandList', params,
    function (data) {
      successCallback(data);
    })
};
