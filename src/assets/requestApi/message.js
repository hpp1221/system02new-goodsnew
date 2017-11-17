import Vue from 'vue'
import '../js'

//发送邮件
Vue.prototype.httpApi.message.getEmailMessage = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/user/getEmailMessage.do', params,
    function (data) {
      successCallback(data);
    })
};
//发送短信
Vue.prototype.httpApi.message.getMessage = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/user/getMessage.do', params,
    function (data) {
      successCallback(data);
    })
};
