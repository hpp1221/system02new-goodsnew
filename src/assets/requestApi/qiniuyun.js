import Vue from 'vue'
import '../js'
//上传图片ueditor
Vue.prototype.httpApi.qiniuyun.imgSignature = function (params, successCallback) {
  Vue.prototype.httpPost('/oss/qiniuyun/oss/imgSignature', params,
    function (data) {
      successCallback(data);
    })
};
//上传文件ueditor
Vue.prototype.httpApi.qiniuyun.config = function (params, successCallback) {
  Vue.prototype.httpPost('/oss/qiniuyun/oss/ue/config', params,
    function (data) {
      successCallback(data);
    })
};
