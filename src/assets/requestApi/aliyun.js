import Vue from 'vue'
import '../js'
//获取私有文件链接
Vue.prototype.httpApi.aliyun.getPrivateFile = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/getPrivateFile', params,
    function (data) {
      successCallback(data);
    })
};
//上传图片签名
Vue.prototype.httpApi.aliyun.imgSignature = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/imgSignature', params,
    function (data) {
      successCallback(data);
    })
};
//获取配置
Vue.prototype.httpApi.aliyun.ueConfig = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/ue/config', params,
    function (data) {
      successCallback(data);
    })
};
//获取配置
Vue.prototype.httpApi.aliyun.uploadFile = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/uploadFile', params,
    function (data) {
      successCallback(data);
    })
};
