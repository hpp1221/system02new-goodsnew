// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/total.css'
import Vuex from 'vuex'
import moment from 'moment';
import {Loading,Notification} from 'element-ui';
Vue.config.productionTip = false

var qs = require('qs')
Vue.prototype.qs = qs

var axios = require('axios')
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(Vuex);
var loadingInstance;
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //loadingInstance = Loading.service({ fullscreen: true });
      return config;
    
  }, function (error) {
    // 对请求错误做些什么
    
     Notification.error({
	      title: '错误',
	      message: response.data.message,
	      duration:1000
	    });
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //loadingInstance.close();
    if(response.data.code != "10000"){
       
       Notification.error({
	      title: '错误',
	      message: response.data.message,
	      duration:1000
	    });
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    store.commit('showLoading',false);
    return Promise.reject(error);
  });
  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
