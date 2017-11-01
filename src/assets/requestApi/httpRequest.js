import Vue from 'vue';
const axios = require('axios');
const qs = require('qs');
import {Loading, Message, MessageBox} from 'element-ui';
import router from '../../router/index';
const successCode = 10000;
const loginAgainCode = 30000;
var loadingInstance;
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //loadingInstance = Loading.service({ fullscreen: true });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //loadingInstance.close();
  //let data = response.data;
  // if (data.code && data.code !== successCode) {
  //   Message.error(data.message);
  // }
  // if (data.code === loginAgainCode) {
  //
  // }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
Vue.prototype.httpGet = function (url, params, successCallback, failCallback) {//get请求
  let self = this;
  self.$http.get(url, {params: params}).then(function (response) {
    let data = response.data;
    if (data.code === successCode) {
      successCallback(data);
    } else {
      if (failCallback) {
        failCallback(data);
      } else {
        if (data.code === loginAgainCode) {
          MessageBox.alert('登录超时,请重新登录', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              router.push('/login')
            }
          });
        } else {
          self.$message.error(data.message);
        }
      }
    }
  }).catch(function (error) {
    console.log(error);
    //self.$message.error('系统错误');
  });
};
Vue.prototype.httpPost = function (url, params, successCallback) {//post请求
  let self = this;
  self.$http.post(url, qs.stringify(params)).then(function (response) {
    let data = response.data;
    if (data.code === successCode) {
      successCallback(data);
    } else if (data.code === loginAgainCode) {
      MessageBox.alert('登录超时,请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          router.push('/login')
        }
      });
    } else {
      self.$message.error(data.message);
    }
  }).catch(function (error) {
    console.log(error);
    //self.$message.error('系统错误');
  });
};
