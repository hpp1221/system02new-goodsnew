import Vue from 'vue'
import '../js'
//获取菜单
Vue.prototype.httpApi.index.menus = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/index/menus', params,
    function (data) {
      successCallback(data);
    })
};
