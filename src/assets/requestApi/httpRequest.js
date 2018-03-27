import Vue from 'vue';
const axios = require('axios');
const qs = require('qs');
import {Loading, Message, MessageBox} from 'element-ui';
import router from '../../router/index';
Vue.prototype.$http = axios;
Vue.prototype.qs = qs;
const successCode = 10000;
const loginAgainCode = 30000;
var loadingInstance;
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //loadingInstance = Loading.service({ fullscreen: true });
  config.headers.token = localStorage.getItem('token') || '';
  config.headers.memberId = localStorage.getItem('memberId')||'';
  config.headers.loginId = localStorage.getItem('loginId')||'';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //loadingInstance.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
Vue.prototype.httpGet = function (url, params, successCallback, failCallback, errorCallback) {//get请求
  let self = this;
  self.$http.get(url, {params: params}).then(function (response) {
    if(response.headers.refreshToken){
      localStorage.setItem('token',response.headers.refreshToken);
    }
    let data = response.data;
    switch (data.code) {
      case successCode:
        successCallback(data);
        break;
      case loginAgainCode:
        failCallback ? failCallback(data) :
          MessageBox.alert('登录超时,请重新登录', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              router.push('/login')
            }
          });
        break;
      default:
        failCallback ? failCallback(data) :
          self.$message({
            dangerouslyUseHTMLString: true,
            message: data.message
          });
        break;
    }
  }).catch(function (error) {
    errorCallback ? errorCallback(error) :
      console.log(error);
    //self.$message.error('系统错误');
  });
};
Vue.prototype.httpPost = function (url, params, successCallback, failCallback, errorCallback) {//post请求
  let self = this;
  self.$http.post(url, params).then(function (response) {
    if(response.headers.refreshToken){
      localStorage.setItem('token',response.headers.refreshToken);
    }
    let data = response.data;
    switch (data.code) {
      case successCode:
        successCallback(data);
        break;
      case loginAgainCode:
        failCallback ? failCallback(data) :
          MessageBox.alert('登录超时,请重新登录', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              router.push('/login')
            }
          });
        break;
      default:
        failCallback ? failCallback(data) :
          self.$message({
            dangerouslyUseHTMLString: true,
            message: data.message
          });
        break;
    }
  }).catch(function (error) {
    errorCallback ? errorCallback(error) :
      console.log(error);
    //self.$message.error('系统错误');
  });
};
