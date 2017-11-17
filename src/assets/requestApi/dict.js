import Vue from 'vue'
import '../js'
//查询数据字典
Vue.prototype.httpApi.dict.selectDictByType = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/dict/selectDictByType', params,
    function (data) {
      successCallback(data);
    })
};
